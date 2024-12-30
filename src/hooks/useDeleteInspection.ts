import { useDialog, useToast } from '@/components/ui'
import { InspectionSheetModel } from '@/database/model'
import { deleteInspectionSheet } from '@/functions/watermelondb/delete-inspection-sheet'
import { updateStatusProcess } from '@/functions/watermelondb/update-status-process'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export type UseDeleteInspectionProps = {
  inspectionSheet: InspectionSheetModel
  idSchedule: string
  index?: number
  qtdInspectionSheets: number
}

export function useDeleteInspection({
  inspectionSheet,
  idSchedule,
  qtdInspectionSheets
}: UseDeleteInspectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { setOpen } = useDialog()
  const { toast } = useToast()
  const { replace } = useRouter()
  async function handleDelete() {
    try {
      setIsLoading(true)
      deleteInspectionSheet(inspectionSheet.id)

      if (qtdInspectionSheets === 1) {
        updateStatusProcess({
          id: inspectionSheet.processosId,
          status: 'PENDENTE'
        })
      }
      
      toast('Folha de vistoria excluída', 'success', 3000)
    } catch (error) {
      toast('Algo deu errado, tente novamente mais tarde', 'destructive', 3000)
    } finally {
      setIsLoading(false)

      setOpen(false)

      replace(`/(private)/home/schedule/${idSchedule}`)
    }
  }

  return { handleDelete, isLoading }
}
