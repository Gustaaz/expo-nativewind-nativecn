import { z } from 'zod'
import base64 from 'react-native-base64'

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Obrigatório' })
    .trim()
    .toLowerCase()
    .email({
      message: 'Digite um e-mail válido, ex: matricula@portovelho.ro.gov.br'
    }),
  password: z
    .string({ required_error: 'Obrigatório' })
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' })
    .transform((value) => {
      return base64.encode(value)
    })
})
