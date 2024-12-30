import { HttpClient } from '@/adapters/axios-adapter'
import { ProcessWithDocuments } from '@/hooks/useScheduleById'
import { Schedule } from '@/types/schedule'

type UpdateStatusCompletScheduleProps = {
  httpClient: HttpClient
  id: number
  process: ProcessWithDocuments[]
}

export const updateStatusCompletSchedule = async ({
  httpClient,
  id,
  process
}: UpdateStatusCompletScheduleProps) => {
  const processMap = process.map((proc) => {
    return {
      _id: proc._id,
      flgStatus: proc.flgStatus,
      motivoExclusao: proc.motivoExclusao
    }
  })

  const response = await httpClient.request({
    url: '/updateStatus',
    method: 'post',
    type: 'schedule',
    body: { id, process: processMap }
  })

  return response.body as Schedule[]
}
