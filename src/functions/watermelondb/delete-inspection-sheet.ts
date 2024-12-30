import { database } from '@/database'
import { Image64Model, InspectionSheetModel } from '@/database/model'
import { Q } from '@nozbe/watermelondb'

export async function deleteInspectionSheet(id: string) {
  await database.write(async () => {
    const inspectionSheet = await database
      .get<InspectionSheetModel>('inspection_sheets')
      .query(Q.where('id', Q.eq(id)))
      .fetch()

    const images64 = await database
      .get<Image64Model>('image64')
      .query(Q.where('inspectionSheetId', id))
      .fetch()

    await Promise.all(images64.map(async (image) => image.destroyPermanently()))

    await inspectionSheet[0].destroyPermanently()
  })
}
