import { router } from 'expo-router'
import { useState } from 'react'
import { AxiosHttpClient } from '@/adapters/axios-adapter'
import { newInspectionSheet } from '@/api/new-inspection-sheet'
import { updateStatusCompletSchedule } from '@/api/update-status-complet-schedule'
import { useToast, useDialog } from '@/components/ui'
import { deleteDocuments } from '@/functions/watermelondb/delete-documents'
import { deleteInspectionSheet } from '@/functions/watermelondb/delete-inspection-sheet'
import { deleteProcess } from '@/functions/watermelondb/delete-process'
import { deleteSchedule } from '@/functions/watermelondb/delete-schedule'
import { getAllInspectionSheetInProcess } from '@/functions/watermelondb/get-all-inspection-sheet-in-process'
import { getScheduleById } from '@/functions/watermelondb/get-schedule-by-id'
import { saveImage } from '@/api/save-image'

type DialogSyncInspectionSheetProps = {
  idSchedule: number
}

export type StatusSync ={
  statusSync: string
  progress: number
}
export function useSyncInspectionSheet({
  idSchedule
}: DialogSyncInspectionSheetProps) {
  const [isloading, setIsloading] = useState(false)
  const [statusSync, setStatusSync] = useState({} as StatusSync)
  const { toast } = useToast()
  const { setOpen } = useDialog()

  async function syncInspectionSheets() {
    setIsloading(true)
    const { process } = await getScheduleById(idSchedule)

    const inspectionSheetPromises = process.map(
      async (proc) => await getAllInspectionSheetInProcess(proc._id)
    )

    const inspectionSheets = await Promise.all(inspectionSheetPromises)

    const inspectionSheetsFlat = inspectionSheets.flat()

    try {
      await Promise.all(
        inspectionSheetsFlat.map(async (inspectionSheet, index) => {
          setStatusSync({
            statusSync: `Sincronizando a folha de vistoria ${index + 1} de ${inspectionSheetsFlat.length}`,
            progress: 1
          })

         const images64 = await Promise.all(inspectionSheet.images.map(async (image, index) => {
            setStatusSync({
              statusSync: `Enviando imagens`,
              progress: ((index + 1) / inspectionSheet.images.length) * 90
            })
            
            const { id } = await saveImage({
              httpClient: new AxiosHttpClient(),
              body: {
                images: image
              }
            })

            return id
          }))

          const bodyInspectionSheet = {
            ...inspectionSheet.selectedVariables,
            images: images64
          }

 

          await newInspectionSheet({
            httpClient: new AxiosHttpClient(),
            inspectionSheets: [bodyInspectionSheet]
          })
          
          setStatusSync({ statusSync: 'Apagando a folha de vistoria no tablet', progress: 70 })
          await deleteInspectionSheet(inspectionSheet.selectedVariables.id)
          setStatusSync({ statusSync: 'Apagando os processos da folha de vistoria no tablet', progress: 80 })
        })
        
      )
      await Promise.all(
        process.map(async (proc) => {
          
          await deleteProcess(proc._id)
          setStatusSync({ statusSync: 'Apagando os processos no tablet', progress: 90 })
  
          await deleteDocuments(proc._id)
          setStatusSync({ statusSync: 'Folha de vistoria sincronizada', progress: 100 })
        })
      )
    } catch (error) {
      console.log(error)
      const _error = error as Error

      setIsloading(false)
      setOpen(false)
      return toast(
        _error.message || 'Falha ao sincronizar as folhas de vistoria',
        'destructive',
        3000
      )
    }

    const allIdsExist = process.every(
      (process) => process.flgStatus === 'CONCLUIDO' || process.flgStatus === 'CANCELADO'
    )

    if (allIdsExist) {
      await deleteSchedule(idSchedule)
      try {
        await updateStatusCompletSchedule({
          httpClient: new AxiosHttpClient(),
          id: idSchedule,
          process
        })

        toast('Folha de vistoria sincronizada com sucesso', 'success', 3000)

        setOpen(false)
        return router.back()
      } catch (_) {
        setIsloading(false)
        setOpen(false)
        return toast(
          'Falha ao atualizar o status do agendamento no sede',
          'destructive',
          3000
        )
      }
    }

    toast('Folha de vistoria sincronizada com sucesso', 'success', 3000)
    setOpen(false)
    setIsloading(false)
    return router.replace(`/(private)/home/schedule/${idSchedule}`)
  }

  return { syncInspectionSheets, isloading, statusSync }
}
