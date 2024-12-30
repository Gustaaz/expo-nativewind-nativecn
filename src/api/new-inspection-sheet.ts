import { HttpClient } from '@/adapters/axios-adapter'
import { InspectionSheet } from '@/types/inspection'
import { Schedule } from '@/types/schedule'

type NewInspectionSheetProps = {
  httpClient: HttpClient
  inspectionSheets: InspectionSheet[]
}

export const newInspectionSheet = async ({
  httpClient,
  inspectionSheets
}: NewInspectionSheetProps) => {
  const response = await httpClient.request({
    url: '/inspectionSheet',
    method: 'post',
    type: 'schedule',
    body: { inspectionSheets }
  })

  return response.body as Schedule[]
}
