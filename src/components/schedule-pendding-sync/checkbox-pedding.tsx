import moment from 'moment'
import { Checkbox } from '../ui'
import type { Schedule } from '@/types/schedule'

interface CheckboxPeddingProps {
  schedule: Schedule
  index: number
  setSchedulePending: React.Dispatch<React.SetStateAction<Schedule[]>>
  handleStatusChange: (
    index: number,
    setSchedulePending: React.Dispatch<React.SetStateAction<Schedule[]>>
  ) => void
}

export function CheckboxPedding({
  schedule,
  index,
  setSchedulePending,
  handleStatusChange
}: CheckboxPeddingProps) {
  const isNotSynchronized = schedule.status === 'SINCRONIZADO'

  return (
    <Checkbox
      isChecked={isNotSynchronized}
      toggleCheckbox={() => handleStatusChange(index, setSchedulePending)}
      className="w-full"
      label={moment(schedule.data_agendamento)
        .add(1, 'days')
        .format('DD/MM/YYYY')}
      description={`Agendamento tem ${schedule.processos.length} processos aguardando sicronização`}
    />
  )
}
