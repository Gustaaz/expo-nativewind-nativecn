import { useState, useContext, useEffect } from 'react'
import { useToast } from '@/components/ui'
import { AuthContext } from '@/context/auth-context'
import { getAllSchedules } from '@/functions/watermelondb/get-all-schedules'
import { SchedulesWithProcesses } from '@/types/schedules-with-processes'

export function useHome() {
  const [schedules, setSchedules] = useState<SchedulesWithProcesses[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { surveyor } = useContext(AuthContext)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchSchedules() {
      if (!surveyor) {
        return toast('Usuário não autenticado', 'destructive', 4000)
      }

      const arrayShedules = await getAllSchedules(surveyor.email)

      if (arrayShedules.length > 0) {
        setSchedules(arrayShedules)
      }

      setIsLoading(false)
    }
    fetchSchedules()
  }, [surveyor?.email])

  return {
    schedules,
    isLoading
  }
}
