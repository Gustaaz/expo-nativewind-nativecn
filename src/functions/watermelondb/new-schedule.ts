import axios from 'axios'
import { database } from '@/database'
import { Q } from '@nozbe/watermelondb'
import type {
  Base64Model,
  DocumentModel,
  ProcessModel,
  ScheduleModel
} from '@/database/model'
import type { Schedule } from '@/types/schedule'
import moment from 'moment'
import { getBase64ByEdoc } from './get-base64-by-edoc'
import { getProcess } from './get-process-by-id'
import type { Document } from '@/types/document'
import type { Process } from '@/types/process'
import pLimit from 'p-limit'

// Limita o número de promessas simultâneas
const limit = pLimit(5) // Ajuste o número de promessas simultâneas conforme necessário

export const newSchedule = async (
  schedule: Schedule[],
  name: string,
  onSetProgress: (progress: number) => void,
  onSetTotalDocument: (value: number) => void,
  onSetDocumentCurrent: (value: number) => void
) => {
  const createdSchedules: number[] = []
  const createdProcesses: number[] = []
  const createdDocuments: number[] = []
  try {
    onSetProgress(0)
    const scheduleIds: number[] = await database.write(async () => {
      const scheduleIds: number[] = []
      const totalDocuments = schedule
        .filter((item) => item.status === 'SINCRONIZADO')
        .reduce(
          (total, item) =>
            total +
            item.processos.reduce(
              (total, processo) => total + processo.documentos.length,
              0
            ),
          0
        )

      onSetTotalDocument(totalDocuments)
      let processedDocuments = 0

      await Promise.all(
        schedule
          .filter((item) => item.status === 'SINCRONIZADO')
          .map(async (item) => {
            const existingSchedule = await database
              .get<ScheduleModel>('schedules')
              .query(Q.where('_id', item.id))
              .fetch()

            // Cria agendamento se não existir
            if (existingSchedule.length === 0) {
              await createSchedule(item, name)

              createdSchedules.push(item.id)
              scheduleIds.push(item.id)
            }
            await Promise.all(
              item.processos.map(async (itemProcess) => {
                const existingProcess = await database
                  .get<ProcessModel>('processes')
                  .query(Q.where('idProcesso', itemProcess.idProcesso))
                  .fetch()

                // Cria processo se não existir
                if (existingProcess.length === 0) {
                  await createProcess(itemProcess)

                  createdProcesses.push(itemProcess.id)
                }

                await Promise.all(
                  itemProcess.documentos.map((itemDocument) =>
                    limit(async () => {
                      const existingDocument = await database
                        .get<DocumentModel>('documents')
                        .query(Q.where('idDocumento', itemDocument.idDocumento))
                        .fetch()

                      if (existingDocument.length === 0) {
                        await createDocument(itemDocument)
                        createdDocuments.push(itemDocument.id)
                      }

                      processedDocuments += 1
                      onSetDocumentCurrent(processedDocuments)
                      const progress = Math.round(
                        (processedDocuments / totalDocuments) * 100
                      )
                      onSetProgress(progress)
                    })
                  )
                )
              })
            )
          })
      )
      return scheduleIds
    })

    return scheduleIds
  } catch (error) {
    console.error('Erro na sincronização:', error)
    await rollback(createdSchedules, createdProcesses, createdDocuments)
    onSetProgress(0)
    onSetTotalDocument(0)
  }
}

async function createSchedule(item: Schedule, name: string) {
  return await database.get<ScheduleModel>('schedules').create((s) => {
    s._id = item.id
    s.data_agendamento_at = new Date(item.data_agendamento)
    s.email = item.email
    s.status = item.status
    s.nome = name
    s.created = moment().format()
  })
}

async function createProcess(itemProcess: Process) {
  return await database.get<ProcessModel>('processes').create((p) => {
    p._id = itemProcess.id
    p.idProcesso = itemProcess.idProcesso
    p.agendamento_id = itemProcess.agendamentoId
    p.assunto = itemProcess.assunto
    p.nrProc = itemProcess.nrProc
    p.anoProc = itemProcess.anoProc
    p.classe = itemProcess.classe
    p.dtAutuacao = itemProcess.dtAutuacao
    p.fase = itemProcess.fase
    p.interessado = itemProcess.interessado
    p.nrdv = itemProcess.nrdv
    p.nrsiorg = itemProcess.nrsiorg
    p.protocolo = itemProcess.protocolo
    p.sinopse = itemProcess.sinopse
    p.status = itemProcess.status
    p.motivoExclusao = itemProcess.motivoExclusao || ''
    p.flgStatus = itemProcess.flgStatus
    p.is_flgEletronico = itemProcess.flgEletronico
    p.is_flgSigiloso = itemProcess.flgSigiloso
  })
}

async function createDocument(itemDocument: Document) {
  const base64Record = await fetchBase64(itemDocument.idArqPdfCas)
  await database.get<Base64Model>('base64').create((b) => {
    b.base64 = base64Record
    b.eDoc = itemDocument.eDoc
  })

  await database.get<DocumentModel>('documents').create((d) => {
    d._id = itemDocument.id
    d.idDocumento = itemDocument.idDocumento
    d.processosId = itemDocument.processosId
    d.numero = itemDocument.numero
    d.ano = itemDocument.ano
    d.eDoc = itemDocument.eDoc
    d.idArqPdfCas = itemDocument.idArqPdfCas
    d.descricao = itemDocument.descricao
    d.tipoDocumento = itemDocument.tipoDocumento
    d.sigiloso = itemDocument.sigiloso
    d.sgsistema = itemDocument.sgsistema
  })
}

async function fetchBase64(idArqPdfCas: string) {
  const { data } = await axios.get(
    `https://cas.portovelho.ro.gov.br/api/v1/document/${idArqPdfCas}/base64`
  )
  return data || ''
}

const rollback = async (
  schedules: number[],
  processes: number[],
  documents: number[]
) => {
  await database.write(async () => {
    for (const id of documents) {
      const [doc] = await database
        .get<DocumentModel>('documents')
        .query(Q.where('_id', id))
        .fetch()
      if (doc) {
        const base64 = await getBase64ByEdoc(doc.eDoc)
        await doc.destroyPermanently()
        if (base64) await base64.destroyPermanently()
      }
    }
    for (const id of processes) {
      const process = await getProcess(id)
      if (process) await process.destroyPermanently()
    }
    for (const id of schedules) {
      const [schedule] = await database
        .get<ScheduleModel>('schedules')
        .query(Q.where('_id', id))
        .fetch()
      if (schedule) await schedule.destroyPermanently()
    }
  })
}
