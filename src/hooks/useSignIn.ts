import { getUser } from '@/functions/watermelondb/get-user'
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNetInfo } from '@react-native-community/netinfo'
import { AuthContext } from '@/context/auth-context'
import { signInSchema } from '@/schemas/signIn-schema'
import { User } from '@/types/user'

import { useToast } from '@/components/ui'

export function useSignIn() {
  const [isLoad, setIsLoad] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { isConnected, type, isWifiEnabled } = useNetInfo()
  const { toast } = useToast()
  const { signIn, signInNotConected } = useContext(AuthContext)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function toggleShowPassword() {
    setShowPassword((prev) => !prev)
  }

  async function onSignIn(data: User) {
    setIsLoad(true)

    if (isConnected && type === 'wifi' && isWifiEnabled) {
      return await singnConnectedWifi(data)
    }

    await singnNotConnectedWifi(data)
  }

  async function singnConnectedWifi(data: User) {
    try {
      await signIn(data)
    } catch (error) {
      const _error = error as Error
      toast(_error.message, 'destructive', 5000)
    } finally {
      setTimeout(() => {
        setIsLoad(false)
      }, 3000)
    }
  }

  async function singnNotConnectedWifi(data: User) {
    try {
      const user = await getUser(data)

      if (!user) {
        return toast(
          'O dispositivo atual não possui conexão com a internet e não foi encontrado nenhum usuário configurado. Por favor, verifique sua conexão com a internet e certifique-se de que pelo menos um usuário esteja configurado no dispositivo para continuar.',
          'destructive',
          5000
        )
      }
      signInNotConected(user)
    } catch (error) {
      const _error = error as Error
      return toast(_error.message, 'destructive', 5000)
    } finally {
      setIsLoad(false)
    }
  }

  return {
    errors,
    isLoad,
    control,
    showPassword,
    onSignIn,
    handleSubmit,
    toggleShowPassword
  }
}
