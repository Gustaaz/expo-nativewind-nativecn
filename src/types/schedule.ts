import { Process } from './process'

export type Schedule = {
  id: number
  data_agendamento: Date
  createdAt?: string
  updatedAt?: string
  email: string
  transferido?: boolean
  status: 'PENDENTE' | 'SINCRONIZADO' | 'CONCLUIDO' | 'CANCELADO'
  processos: Process[]
}
