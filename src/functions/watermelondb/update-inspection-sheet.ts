import { database } from '@/database'
import { InspectionSheetModel } from '@/database/model'
import { InspectionSheet } from '@/types/inspection'

type UpdateInspectionSheetProps = {
  id: string
  data: InspectionSheet
}

export async function updateInspectionSheet({
  id,
  data
}: UpdateInspectionSheetProps) {
  delete data.id
  await database.write(async () => {
    const inspectionSheetModel = await database
      .get<InspectionSheetModel>('inspection_sheets')
      .find(id)
      
    await inspectionSheetModel.update((inspectionSheet) => {
      Object.assign(inspectionSheet, data)
      inspectionSheet.dataFolha = new Date().toString()
    })
  })
}
