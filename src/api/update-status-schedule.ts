import { HttpClient } from '@/adapters/axios-adapter'
import { Schedule } from '@/types/schedule'

type UpdateStatusScheduleProps = {
  httpClient: HttpClient
  schedulePending: Schedule[]
}

export const updateStatusSchedule = async ({
  httpClient,
  schedulePending
}: UpdateStatusScheduleProps) => {
  const response = await httpClient.request({
    url: '/schedule/status',
    method: 'put',
    type: 'schedule',
    body: schedulePending
  })

  return response.body as Schedule[]
}
