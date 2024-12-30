import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class Base64Model extends Model {
  static table = 'base64'

  @field('eDoc') eDoc!: string
  @field('base64') base64!: string
}
