import { Text, View } from 'react-native'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog
} from './ui'
import { DetailsValue } from './details-value'
import moment from 'moment'
import { DialogSyncInspectionSheet } from './dialog-sync-inspection-sheet'

type DetailsScheduleProps = {
  qntProcess: number
  qntDocuments: number
  qtdInspectionSheets: number
  dataCreated: string
  idSchedule: number
  allWithInspectionSheets?: boolean
}
export function DetailsSchedule({
  qntProcess = 0,
  qntDocuments = 0,
  qtdInspectionSheets = 0,
  idSchedule,
  dataCreated,
  allWithInspectionSheets
}: DetailsScheduleProps) {
  return (
    <Card className="w-full bg-[#FFFF] dark:bg-[#18181A]">
      <CardHeader>
        <View className="flex-row flex-wrap items-center justify-between gap-2">
          <View>
            <CardTitle>Detalhes do agendamento</CardTitle>
            <CardDescription>SEMUR Porto Velho, Rondônia</CardDescription>
          </View>

          <Dialog>
            <DialogSyncInspectionSheet
              allWithInspectionSheets={allWithInspectionSheets}
              qtdInspectionSheets={qtdInspectionSheets}
              idSchedule={idSchedule}
            />
          </Dialog>
        </View>
      </CardHeader>
      <CardContent className="w-full flex-row flex-wrap gap-4">
        <DetailsValue
          value={qntProcess.toString()}
          description="total de processos"
          icon={'folder-o'}
        />
      </CardContent>
      <CardFooter className="flex-row justify-center rounded-b-md border-t-hairline bg-[#F9F9FA] dark:bg-[#18181A]">
        <View className="py-2 text-xs text-muted-foreground">
          <Text className="dark:text-white">
            Sincronizado: {moment(dataCreated).format('DD/MM/YYYY [ás] HH:mm')}
          </Text>
        </View>
      </CardFooter>
    </Card>
  )
}
