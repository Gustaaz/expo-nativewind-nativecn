import { database } from '@/database'
import { Image64Model } from '@/database/model'
import { Q } from '@nozbe/watermelondb'

export const getImages64 = async (id: string) => {
  const images64 = await database
    .get<Image64Model>('image64')
    .query(Q.where('inspectionSheetId', id))
    .fetch()

  return images64
}
