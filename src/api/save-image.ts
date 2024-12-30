import { HttpClient } from '@/adapters/axios-adapter'

type SaveImagesBody = {
    images: string
}

type SaveImageProps = {
  httpClient: HttpClient
  body: SaveImagesBody
}

export const saveImage = async ({
  httpClient,
  body
}: SaveImageProps) => {
  const response = await httpClient.request({
    url: '/saveImage',
    method: 'post',
    type: 'schedule',
    body
  })

  return response.body as {id: number}
}
