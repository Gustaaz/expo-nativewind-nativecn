import { useState, useEffect, useContext, useCallback } from 'react'
import { AxiosHttpClient } from '@/adapters/axios-adapter'
import { fetchSchedulePeding } from '@/api/fetch-schedule-peding'
import { useToast } from '@/components/ui'
import type { Schedule } from '@/types/schedule'
import { useNetInfo } from '@react-native-community/netinfo'
import { updateStatusSchedule } from '@/api/update-status-schedule'
import { newSchedule } from '@/functions/watermelondb/new-schedule'
import { router, useFocusEffect } from 'expo-router'
import { AuthContext } from '@/context/auth-context'

export function usePendingSchedules() {
  const [isLoading, setIsLoading] = useState(false)
  const [schedules, setSchedules] = useState<Schedule[]>([] as Schedule[])
  const { toast } = useToast()
  const {
    surveyor,
    onSetProgress,
    progress,
    onSetTotalDocument,
    onSetDocumentCurrent,
    documentCurrent,
    totalDocument
  } = useContext(AuthContext)
  const { isConnected, type, isWifiEnabled } = useNetInfo()

  useFocusEffect(
    useCallback(() => {
      const fetchPending = async () => {
        if (isConnected && type === 'wifi' && isWifiEnabled) {
          const pending = await fetchSchedulePeding({
            httpClient: new AxiosHttpClient()
          })
          if (pending.length > 0) {
            setSchedules(pending)
          }
        }
      }
      fetchPending()
    }, [type, isConnected, isWifiEnabled])
  )

  // const handleSelectAll = (
  //   schedulePending: Schedule[],
  //   setSchedulePending: React.Dispatch<React.SetStateAction<Schedule[]>>
  // ) => {
  //   const isAllSelected = schedulePending.every(
  //     (item) => item.status === 'SINCRONIZADO'
  //   )
  //   const updatedSchedulePending: Schedule[] = schedulePending.map((item) => ({
  //     ...item,
  //     status: isAllSelected ? 'PENDENTE' : 'SINCRONIZADO'
  //   }))
  //   setSchedulePending(updatedSchedulePending)
  // }

  const handleStatusChange = (
    itemIndex: number,
    setSchedulePending: React.Dispatch<React.SetStateAction<Schedule[]>>
  ) => {
    const updatedSchedulePending = [...schedules]
    const item = updatedSchedulePending[itemIndex]
    const hasSynchronized = updatedSchedulePending.some(
      (otherItem) =>
        otherItem.status === 'SINCRONIZADO' && otherItem.id !== item.id
    )
    if (hasSynchronized) {
      return toast('Somente um agendamento pode ser sincronizado por vez')
    }
    updatedSchedulePending[itemIndex].status =
      updatedSchedulePending[itemIndex].status === 'PENDENTE'
        ? 'SINCRONIZADO'
        : 'PENDENTE'
    setSchedulePending(updatedSchedulePending)
  }

  const handleSync = async () => {
    try {
      setIsLoading(true)
      const selectedSchedules = schedules.filter(
        (item) => item.status === 'SINCRONIZADO'
      )

      if (selectedSchedules.length === 0) {
        return toast(
          'Selecione pelo menos um agendamento para sincronizar',
          'default',
          4000
        )
      }

      if (!surveyor) {
        return toast('Usuário não autenticado', 'destructive', 4000)
      }

      const ids = await newSchedule(
        selectedSchedules,
        surveyor?.nome,
        onSetProgress,
        onSetTotalDocument,
        onSetDocumentCurrent
      )

      if (!ids) {
        return toast(
          'Algo inesperado aconteceu ao tentar sincronizar. Tente novamente mais tarde.',
          'destructive',
          6000
        )
      }
      await updateStatusSchedule({
        httpClient: new AxiosHttpClient(),
        schedulePending: selectedSchedules
      })

      toast('Agendamentos sincronizados com sucesso', 'success', 4000)
      onSetProgress(0)
      onSetTotalDocument(0)
      onSetDocumentCurrent(0)
      router.navigate('/home/')
    } catch (error) {
      toast(
        'Algo inesperado aconteceu ao tentar sincronizar. Tente novamente mais tarde.',
        'destructive',
        6000
      )
    } finally {
      setIsLoading(false)
    }
  }

  return {
    schedules,
    isLoading,
    progress,
    documentCurrent,
    totalDocument,
    setSchedules,
    // handleSelectAll,
    handleStatusChange,
    handleSync
  }
}
