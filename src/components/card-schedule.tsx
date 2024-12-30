import moment from 'moment'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'
import { Text, View } from 'react-native'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui'
import { SchedulesWithProcesses } from '@/types/schedules-with-processes'

interface CardScheduleProps {
  schedules: SchedulesWithProcesses
  index: number
}

export function CardSchedule({ schedules, index }: CardScheduleProps) {
  const { push } = useRouter()

  return (
    <MotiView
      transition={{ delay: index * 50, damping: 15, mass: 1 }}
      from={{
        opacity: 0,
        translateX: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0,
        translateX: 0
      }}
      className="w-full"
    >
      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between rounded-md bg-[#F9F9FA] p-6 dark:bg-[#18181A]">
          <View className="gap-0.5">
            <CardTitle>Agendamento</CardTitle>
            <CardDescription>
              Data:{' '}
              {moment(schedules.data_agendamento_at)
                .add(1, 'days')
                .format('DD/MM/YYYY')}
            </CardDescription>
          </View>
          <Button
            label="Ver mais"
            className="h-8"
            onPress={() => {
              push(`/(private)/home/schedule/${schedules._id.toString()}`)
            }}
          />
        </CardHeader>
        <CardContent className="bg-[#FFFFFF] p-6 dark:bg-[#09090B]">
          <View className="gap-3">
            <Text className="font-bold dark:text-white">
              Detalhes do agendameto
            </Text>
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-muted-foreground">Vistoriador</Text>
                <Text className="dark:text-white">{schedules.nome}</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-muted-foreground">Processos </Text>
                <Text className="dark:text-white">
                  x {schedules.process.length}{' '}
                </Text>
              </View>
            </View>
          </View>
        </CardContent>
        <CardFooter className="flex-row justify-center rounded-b-md border-t-hairline bg-[#F9F9FA] dark:bg-[#18181A]">
          <View className="py-2 text-xs text-muted-foreground">
            <Text className="dark:text-white">
              Sincronizado{' '}
              {moment(schedules.created_at, 'YYYY-MM-DD').format(
                'DD/MM/YYYY [ás] HH:mm'
              )}
            </Text>
          </View>
        </CardFooter>
      </Card>
    </MotiView>
  )
}
