import { createContext, useState } from 'react'
import { router } from 'expo-router'
import { AxiosHttpClient } from '@/adapters/axios-adapter'
import { signInRequest } from '@/api/sigIn-request'
import type { Surveyor } from '@/types/surveyor'
import type { User } from '@/types/user'
import { getUser } from '@/functions/watermelondb/get-user'
import { newUser } from '@/functions/watermelondb/new-user'
import type UserModel from '@/database/model/userModel'

type AuthContextProps = {
  isAuthenticated: boolean
  surveyor: Surveyor | null
  progress: number
  totalDocument: number
  documentCurrent: number
  onSetProgress: (value: number) => void
  onSetTotalDocument: (value: number) => void
  onSetDocumentCurrent: (value: number) => void
  signIn: (data: User) => Promise<void>
  signInNotConected: (data: UserModel) => Promise<void>
  signOut: () => void
}
type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [surveyor, setSurveyor] = useState<Surveyor | null>(null)
  const [progress, setProgress] = useState(0)
  const [totalDocument, setTotalDocument] = useState(0)
  const [documentCurrent, setDocumentCurrent] = useState(0)

  const isAuthenticated = !!surveyor

  const onSetProgress = (value: number) => {
    setProgress(value)
  }

  const onSetTotalDocument = (value: number) => {
    setTotalDocument(value)
  }

  const onSetDocumentCurrent = (value: number) => {
    setDocumentCurrent(value)
  }

  async function signIn(user: User): Promise<void> {
    const { payload } = await signInRequest({
      httpClient: new AxiosHttpClient(),
      user
    })

    const userExists = await getUser(user)
    if (!userExists) {
      newUser({ surveyor: payload, user })
    }
    setSurveyor(payload)
    return router.replace('/home/')
  }

  async function signInNotConected(user: UserModel): Promise<void> {
    setSurveyor(user)
    return router.replace('/home/')
  }

  async function signOut() {
    setSurveyor(null)
    router.replace('/')
  }

  return (
    <AuthContext.Provider
      value={{
        surveyor,
        isAuthenticated,
        progress,
        totalDocument,
        documentCurrent,
        onSetProgress,
        onSetTotalDocument,
        onSetDocumentCurrent,
        signIn,
        signInNotConected,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
