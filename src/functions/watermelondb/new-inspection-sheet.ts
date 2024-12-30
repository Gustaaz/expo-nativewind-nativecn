import { database } from '@/database'
import { InspectionSheetModel, ProcessModel } from '@/database/model'
import { InspectionSheet } from '@/types/inspection'
import { Q } from '@nozbe/watermelondb'

export async function newInspectionSheet(data: InspectionSheet) {
  const { id } = await database.write(async () => {
    const inspectionSheetDatabase = await database
      .get<InspectionSheetModel>('inspection_sheets')
      .create((inspectionSheet: InspectionSheetModel) => {
        Object.assign(inspectionSheet, data)
        inspectionSheet.dataFolha = new Date().toString()
      })

    const process = await database
      .get<ProcessModel>('processes')
      .query(Q.where('_id', Q.eq(data.processosId)))

    if (process[0].flgStatus !== 'CONCLUIDO') {
      await process[0].update((process) => {
        process.flgStatus = 'CONCLUIDO'
        process.motivoExclusao = ''
      })
    }

    return inspectionSheetDatabase
  })

  return id
}
