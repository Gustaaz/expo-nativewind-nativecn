import { database } from '@/database'
import { InspectionSheetModel } from '@/database/model'

export function getInspectionSheet(id: string) {
  const inspectionSheet = database
    .get<InspectionSheetModel>('inspection_sheets')
    .find(id)
  return inspectionSheet
}
