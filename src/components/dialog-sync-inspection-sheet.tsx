import { Text, TouchableOpacity, View } from 'react-native'
import { DialogTrigger, DialogContent, Button, Progress } from './ui'
import { useSyncInspectionSheet } from '@/hooks/useSyncInspectionSheet'

type DialogSyncInspectionSheetProps = {
  qtdInspectionSheets: number
  idSchedule: number
  allWithInspectionSheets?: boolean
}

export function DialogSyncInspectionSheet({
  qtdInspectionSheets = 0,
  idSchedule,
  allWithInspectionSheets
}: DialogSyncInspectionSheetProps) {

  const { syncInspectionSheets, isloading, statusSync } =
    useSyncInspectionSheet({
      idSchedule
    })
  return (
    <>
      <DialogTrigger>
        <TouchableOpacity
          className={`mt-2 flex h-10 w-full flex-row items-center justify-center rounded-md ${!allWithInspectionSheets ? 'bg-primary/50' : 'bg-primary'} px-4`}
          disabled={!allWithInspectionSheets}
        >
          <Text className="text-base text-primary-foreground">Sincronizar</Text>
        </TouchableOpacity>
      </DialogTrigger>
      <DialogContent>
        <View className="flex max-w-sm gap-4">
          <Text className="text-xl font-bold text-primary">
            Sincronizar folha de vistoria
          </Text>
          <Text className="text-primary">
            {statusSync.statusSync
              ? statusSync.statusSync
              : `Voce tem ${qtdInspectionSheets} folha de vistoria completas, deseja sincronizar?`}
          </Text>
          {statusSync.progress && <Progress value={statusSync.progress} />}
          <Button
            label="Confirmar"
            onPress={syncInspectionSheets}
            isloading={isloading}
          />
        </View>
      </DialogContent>
    </>
  )
}
