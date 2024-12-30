import { database } from '@/database'
import { Base64Model } from '@/database/model'
import { Q } from '@nozbe/watermelondb'

export async function getBase64ByEdoc(eDoc: string) {
  const base64 = await database
    .get<Base64Model>('base64')
    .query(Q.where('eDoc', eDoc))
    .fetch()
  return base64[0]
}
