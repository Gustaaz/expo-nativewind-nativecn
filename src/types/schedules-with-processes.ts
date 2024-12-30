import { ProcessModel } from '@/database/model'

export type SchedulesWithProcesses = {
  _id: number
  email: string
  data_agendamento_at: Date
  nome: string
  process: ProcessModel[]
  created_at: Date
}
