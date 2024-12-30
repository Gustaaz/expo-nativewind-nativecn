import { database } from '@/database'
import { Image64Model } from '@/database/model'

type NewImage64 = {
    base64: string
    inspectionSheetId: string
}

export const newImage64 = async ({ base64, inspectionSheetId }: NewImage64) => {
  const image64 = await database
    .get<Image64Model>('image64')
    .create((image64) => {
      image64.base64 = base64
      image64.inspectionSheetId = inspectionSheetId
    })
  return image64
}
