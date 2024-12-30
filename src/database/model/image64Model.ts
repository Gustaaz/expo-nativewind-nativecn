import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class Image64Model extends Model {
  static table = 'image64'

  @field('inspectionSheetId') inspectionSheetId!: string
  @field('image64') base64!: string
}
