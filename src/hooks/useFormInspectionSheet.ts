import { useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui'
import { AuthContext } from '@/context/auth-context'
import { ProcessModel } from '@/database/model'
import { getProcess } from '@/functions/watermelondb/get-process-by-id'
import { inspectionSheetSchema } from '@/schemas/inspection-schema'
import { InspectionSheet } from '@/types/inspection'
import { zodResolver } from '@hookform/resolvers/zod'
import { newInspectionSheet } from '@/functions/watermelondb/new-inspection-sheet'

type useFormInspectionSheetProps = {
  id: string
}

export function useFormInspectionSheet({ id }: useFormInspectionSheetProps) {
  const [process, setProcess] = useState<ProcessModel>({} as ProcessModel)
  const [idInspectionSheet, setIdInspectionSheet] = useState<null | string>(
    null
  )
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const { surveyor } = useContext(AuthContext)
  const { toast } = useToast()
  const { replace } = useRouter()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<InspectionSheet>({
    resolver: zodResolver(inspectionSheetSchema)
  })

  useEffect(() => {
    async function fectProcess() {
      const promisseProcess = await getProcess(Number(id))

      if (!promisseProcess) {
        toast('Processo não encontrado', 'destructive', 4000)
        return replace(`/(private)/home/schedule/${id}`)
      }

      if (!surveyor) {
        toast('Usuário não autenticado', 'destructive', 4000)
        return replace('/')
      }

      setValue('protocolo', promisseProcess.protocolo)
      setValue('processosId', promisseProcess._id)
      setValue('vistoridorEmail', surveyor.email)
      setValue('nome_vistoriador', surveyor.nome)

      setProcess(promisseProcess)
      setIsLoadingPage(false)
    }

    fectProcess()
  }, [id])

  async function onSubmit(data: InspectionSheet) {
    try {
      setIsLoading(true)
      const idNewInspectionSheet = await newInspectionSheet(data)

      setIdInspectionSheet(idNewInspectionSheet)

      setIsOpen(true)
    } catch (error) {
      toast('Algo deu errado, tente novamente mais tarde', 'destructive', 3000)
      replace(`/(private)/home/schedule/${id}`)
    } finally {
      setIsLoading(false)
    }
  }

  function onError() {
    toast('Verifique os campos', 'default', 3000)
  }

  function handleCloseModal() {
    setIsOpen(false)
    toast('Salvo com sucesso', 'success', 3000)
    replace('..')
  }

  function handleNavigateToCamera() {
    setIsOpen(false)
    replace(`/(private)/home/schedule/camera-device/${idInspectionSheet}`)
  }

  return {
    control,
    errors,
    process,
    isLoading,
    isLoadingPage,
    idInspectionSheet,
    isOpen,
    handleSubmit,
    handleCloseModal,
    onSubmit,
    handleNavigateToCamera,
    onError
  }
}
