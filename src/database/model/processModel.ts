import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class ProcessModel extends Model {
  static table = 'processes'

  @field('_id') _id!: number
  @field('idProcesso') idProcesso!: number
  @field('agendamento_id') agendamento_id!: number
  @field('anoProc') anoProc!: number
  @field('nrProc') nrProc!: number
  @field('assunto') assunto!: string
  @field('classe') classe!: string
  @field('dtAutuacao') dtAutuacao!: string
  @field('fase') fase!: string
  @field('interessado') interessado!: string
  @field('nrdv') nrdv!: string
  @field('nrsiorg') nrsiorg!: string
  @field('protocolo') protocolo!: string
  @field('sinopse') sinopse!: string
  @field('status') status!: string
  @field('flgStatus') flgStatus!: string
  @field('motivoExclusao') motivoExclusao!: string
  @field('is_flgEletronico') is_flgEletronico!: boolean
  @field('is_flgSigiloso') is_flgSigiloso!: boolean
}
