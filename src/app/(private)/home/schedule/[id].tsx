import moment from 'moment'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { Badge } from '@/components/ui'
import { BackButton } from '@/components/back-button'
import { DetailsSchedule } from '@/components/details-schedule'
import { CardProcess } from '@/components/card-process/card-process'
import { CardSkeletonScheduleById } from '@/components/card-skeleton-schedule-by-id'
import {
  Schedule as ScheduleType,
  useScheduleById
} from '@/hooks/useScheduleById'

export default function Schedule() {
  const { id } = useLocalSearchParams()
  const { isLoading, schedule } = useScheduleById(id as string)
  function verifyScheduleWithInspectionSheets(schedules: ScheduleType) {
    const allschedulesWithInspectionSheets = schedules.process.every(
      (process) => process.flgStatus === 'CONCLUIDO' || process.flgStatus === 'CANCELADO'
    )
    return allschedulesWithInspectionSheets
  }

  return (
    <ScrollView className="flex-1 bg-[#F9F9FA] py-6 dark:bg-zinc-950">
      <View className="mb-6 justify-start gap-6 px-8 py-6">
        <View className="flex-row flex-wrap items-start justify-between gap-4 ">
          <View className="flex-row items-center gap-2">
            <BackButton />
            <Text className="text-xl font-semibold dark:text-white">
              Controle do agendamento
            </Text>
          </View>
          <Badge
            label={`Data Agendada: ${moment(schedule.data_agendamento_at).format('DD/MM/YYYY')}`}
          />
        </View>
        <View className="w-full gap-4">
          <View className="flex-1 items-start gap-4">
            {isLoading && <CardSkeletonScheduleById />}
            {!isLoading && (
              <>
                <DetailsSchedule
                  allWithInspectionSheets={verifyScheduleWithInspectionSheets(
                    schedule
                  )}
                  idSchedule={Number(id)}
                  dataCreated={schedule.createAt}
                  qntDocuments={schedule.qtdDocuments}
                  qntProcess={schedule.process.length}
                  qtdInspectionSheets={schedule.qtdInspectionSheets}
                />
                {schedule.process.length > 0 &&
                  schedule.process.map((item) => (
                    <CardProcess
                      idSchedule={id as string}
                      key={item._id}
                      process={item}
                    />
                  ))}
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
