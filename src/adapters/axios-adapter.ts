import { useNetInfo } from '@react-native-community/netinfo'
import axios, { AxiosError } from 'axios'

type HttpRequest = {
  type: 'schedule' | 'surveyor'
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  body?: any
  headers?: any
}

type ApiResponse = {
  statusCode: number
  body?: any
}

export interface HttpClient {
  request(data: HttpRequest): Promise<ApiResponse>
}

export class AxiosHttpClient implements HttpClient {
  private readonly baseUrlMap: { schedule: string; surveyor: string }

  constructor() {
    this.baseUrlMap = {
      schedule: process.env.EXPO_PUBLIC_API_SCHEDULE_URL!,
      surveyor: process.env.EXPO_PUBLIC_API_SURVEYOR_URL!
    }
  }

  async request({
    type,
    url,
    method,
    body,
    headers
  }: HttpRequest): Promise<ApiResponse> {
    try {
      const baseUrl = this.baseUrlMap[type]
      const axiosResponse = await axios.request({
        url: `${baseUrl}${url}`,
        method,
        data: body,
        headers
      })

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      }
    } catch (error) {
      console.log(error);
      // const { isConnected, type: type_network, isWifiEnabled } = useNetInfo()
      const axiosError = error as AxiosError<{ message: string }>

      // if (!isConnected) {
      //   throw new Error(
      //     'Sem conexão com a internet. Tente novamente mais tarde.'
      //   )
      // }
      // if (!isWifiEnabled && type_network === 'wifi') {
      //   throw new Error('Sem acesso a rede WiFi. Tente novamente mais tarde.')
      // }

      if (axiosError.response) {
        throw new Error(axiosError.response.data.message)
      }
      throw new Error('Algo inesperado aconteceu. Tente novamente mais tarde.')
    }
  }
}
