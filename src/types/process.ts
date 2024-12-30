import { Document } from './document'

export type Process = {
  id: number
  idProcesso: number
  anoProc: number
  nrProc: number
  assunto: string
  classe: string
  dtAutuacao: string
  fase: string
  interessado: string
  nrdv: string
  nrsiorg: string
  protocolo: string
  sinopse: string
  status: string
  flgEletronico: boolean
  flgSigiloso: boolean
  flgExcluido: boolean
  flgStatus: 'PENDENTE' | 'SINCRONIZADO' | 'CONCLUIDO' | 'CANCELADO'
  motivoExclusao?: string
  agendamentoId: number
  createdAt: Date
  updatedAt: Date
  documentos: Document[]
}
