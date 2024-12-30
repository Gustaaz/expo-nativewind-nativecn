import { database } from '@/database'
import type {
  ScheduleModel,
  ProcessModel,
  DocumentModel,
  InspectionSheetModel
} from '@/database/model'
import { Q } from '@nozbe/watermelondb'

export const getScheduleById = async (id: number) => {
  const schedule = await database
    .get<ScheduleModel>('schedules')
    .query(Q.where('_id', Q.eq(id)))
    .fetch()

  // Fetch processes with related documents in separate query
  const processes = await database
    .get<ProcessModel>('processes')
    .query(Q.where('agendamento_id', Q.eq(id)))
    .fetch()

  const documents = await database
    .get<DocumentModel>('documents')
    .query(
      Q.where('processosId', Q.oneOf(processes.map((process) => process._id)))
    )
    .fetch()

  const qtdDocuments = await database
    .get<DocumentModel>('documents')
    .query(
      Q.where('processosId', Q.oneOf(processes.map((process) => process._id)))
    )
    .fetchCount()

  const inspectionSheets = await database
    .get<InspectionSheetModel>('inspection_sheets')
    .query(
      Q.where('processosId', Q.oneOf(processes.map((process) => process._id)))
    )
    .fetch()

  const qtdInspectionSheets = await database
    .get<InspectionSheetModel>('inspection_sheets')
    .query(
      Q.where('processosId', Q.oneOf(processes.map((process) => process._id)))
    )
    .fetchCount()

  const processWithDocuments = processes.map((process) => {
    const processInpection= inspectionSheets.filter(
      (insp) => insp.processosId === process._id
    )
    const processDocuments = documents.filter(
      (doc) => doc.processosId === process._id
    )

    return {
      _id: process._id,
      agendamento_id: process.agendamento_id,
      anoProc: process.anoProc,
      nrProc: process.nrProc,
      assunto: process.assunto,
      classe: process.classe,
      dtAutuacao: process.dtAutuacao,
      fase: process.fase,
      interessado: process.interessado,
      is_flgEletronico: process.is_flgEletronico,
      is_flgSigiloso: process.is_flgSigiloso,
      nrdv: process.nrdv,
      nrsiorg: process.nrsiorg,
      protocolo: process.protocolo,
      sinopse: process.sinopse,
      status: process.status,
      flgStatus: process.flgStatus as 'PENDENTE' | 'SINCRONIZADO' | 'CONCLUIDO' | 'CANCELADO',
      motivoExclusao: process.motivoExclusao,
      documents: processDocuments,
      inspectionSheets: processInpection
    }
  })

  const scheduleFiltered = {
    _id: schedule[0]._id,
    email: schedule[0].email,
    data_agendamento_at: schedule[0].data_agendamento_at,
    process: processWithDocuments,
    qtdDocuments,
    qtdInspectionSheets,
    createAt: schedule[0].created
  }

  return scheduleFiltered
}
