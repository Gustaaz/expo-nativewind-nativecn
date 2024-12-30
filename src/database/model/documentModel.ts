import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class DocumentModel extends Model {
  static table = 'documents'

  @field('_id') _id!: number
  @field('processosId') processosId!: number
  @field('idDocumento') idDocumento!: number
  @field('numero') numero!: string
  @field('ano') ano!: number
  @field('eDoc') eDoc!: string
  @field('idArqPdfCas') idArqPdfCas!: string
  @field('descricao') descricao!: string
  @field('tipoDocumento') tipoDocumento!: string
  @field('sigiloso') sigiloso!: string
  @field('sgsistema') sgsistema!: string
}
