import type { DocumentModel, InspectionSheetModel } from '@/database/model'
import { getScheduleById } from '@/functions/watermelondb/get-schedule-by-id'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

export type ProcessWithDocuments = {
  _id: number
  agendamento_id: number
  anoProc: number
  assunto: string
  classe: string
  dtAutuacao: string
  fase: string
  interessado: string
  is_flgEletronico: boolean
  is_flgSigiloso: boolean
  motivoExclusao?: string
  nrProc: number
  nrdv: string
  nrsiorg: string
  protocolo: string
  sinopse: string
  status: string
  flgStatus: 'PENDENTE' | 'SINCRONIZADO' | 'CONCLUIDO' | 'CANCELADO'
  documents: DocumentModel[]
  inspectionSheets: InspectionSheetModel[]
}

export type Schedule = {
  _id: number
  email: string
  data_agendamento_at: Date
  process: ProcessWithDocuments[]
  qtdDocuments: number
  qtdInspectionSheets: number
  createAt: string
}

export function useScheduleById(id: string) {
  const [schedule, setSchedule] = useState<Schedule>({} as Schedule)
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const getSchedule = await getScheduleById(Number(id))
        
        setSchedule(getSchedule)
        setIsLoading(false)
      }
      fetchData()
    }, [id])
  )

  return {
    schedule,
    isLoading
  }
}
