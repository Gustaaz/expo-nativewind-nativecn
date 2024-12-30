import { HttpClient } from '@/adapters/axios-adapter'
import { Schedule } from '@/types/schedule'

type FetchSchedulePedingProps = {
  httpClient: HttpClient
}

export const fetchSchedulePeding = async ({
  httpClient
}: FetchSchedulePedingProps) => {
  const response = await httpClient.request({
    url: '/schedule/status/PENDENTE',
    method: 'get',
    type: 'schedule'
  })

  return response.body as Schedule[]
}
