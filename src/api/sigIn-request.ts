import "core-js/stable/atob";
import { jwtDecode } from 'jwt-decode'
import { HttpClient } from '@/adapters/axios-adapter'
import { Surveyor } from '@/types/surveyor'
import { User } from '@/types/user'
import axios from "axios";

type SignInProps = {
    user: User
    httpClient: HttpClient
}

export async function signInRequest({ user, httpClient }: SignInProps) {
  const response = await httpClient.request({
    url: '/sessions',
    method: 'post',
    type: 'surveyor',
    body: {
      email: user.email,
      password: user.password
    }
  })

  const payload: Surveyor = jwtDecode(response.body)

  axios.defaults.headers.Authorization = `Bearer ${response.body}`

  return { token: response.body, payload }
}
