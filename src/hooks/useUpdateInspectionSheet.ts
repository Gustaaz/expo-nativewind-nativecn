import { useToast } from '@/components/ui'
import { getInspectionSheet } from '@/functions/watermelondb/get-inspection-sheet'
import { updateInspectionSheet } from '@/functions/watermelondb/update-inspection-sheet'
import { inspectionSheetSchema } from '@/schemas/inspection-schema'
import { InspectionSheet } from '@/types/inspection'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getImages64 } from '@/functions/watermelondb/get-images64'
import { Image64Model } from '@/database/model'
import { router, useFocusEffect } from 'expo-router'

export function useUpdateInspection(id: string) {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [imagesSources, setImagesSources] = useState<Image64Model[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<InspectionSheet>({
    resolver: zodResolver(inspectionSheetSchema)
  })

  useFocusEffect(
    useCallback(() => {
      async function fetchInspection() {
        setIsLoadingPage(true)
        const [images64, inspection] = await Promise.all([
          getImages64(id),
          getInspectionSheet(id)
        ])

        setImagesSources(images64)
        if (!inspection) {
          toast('Folha de vistoria não encontrada', 'destructive', 3000)
          return router.replace(`/(private)/home/schedule/${id}`)
        }

        const keys = Object.keys(inspection._raw) as (keyof InspectionSheet)[]
        const promises = keys.map((key) => setValue(key, inspection[key]))
        await Promise.all(promises).then(() => setIsLoadingPage(false))
      }
      fetchInspection()
    }, [id])
  )

  async function handleUpdateInspectionSheet(data: InspectionSheet) {
    try {
      setIsLoading(true)
      await updateInspectionSheet({ data, id })

      toast('Atualizado com sucesso', 'success', 3000)
    } catch (error) {
      toast('Algo deu errado, tente novamente mais tarde', 'destructive', 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    control,
    imagesSources,
    handleSubmit,
    handleUpdateInspectionSheet,
    setImagesSources,
    setValue,
    isLoading,
    errors,
    isLoadingPage,
    protocolo: getValues('protocolo')
  }
}
