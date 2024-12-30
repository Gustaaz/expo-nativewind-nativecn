import { View, TouchableOpacity, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { UseDeleteInspectionProps } from '@/hooks/useDeleteInspection'
import { DialogDeleteInspectionSheet } from './dialog-delete-inspection-sheet'
import { useRouter } from 'expo-router'
import { MotiView } from 'moti'


export function DetailsInspectionSheet({
  inspectionSheet,
  idSchedule,
  index,
  qtdInspectionSheets
}: UseDeleteInspectionProps) {
  const { push } = useRouter()
  return (
    <MotiView
      key={index}
      transition={{
        delay: index! * 100,
        damping: 15,
        mass: 1
      }}
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
    >
      <View className="gap-3 pt-3">
        <View className="flex-row items-center justify-between ">
          <View className="flex-col items-start">
            <Text className="font-semibold dark:text-white">
              Incrição cadastral:
            </Text>
            <Text className="font-bold dark:text-white">
              {inspectionSheet.insc_cadastral}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <TouchableOpacity
              onPress={() =>
                push(
                  `/(private)/home/schedule/update-inspectionSheet/${inspectionSheet.id.toString()}`
                )
              }
              className="h-7 w-7 items-center justify-center rounded-md text-primary-foreground"
            >
              <MaterialIcons name="edit" size={14} color={'blue'} />
            </TouchableOpacity>
            <DialogDeleteInspectionSheet
              qtdInspectionSheets={qtdInspectionSheets}
              inspectionSheet={inspectionSheet}
              idSchedule={idSchedule}
              index={index}
            />
          </View>
        </View>
        <View className="flex-row flex-wrap items-center gap-2 rounded-md bg-gray-200 p-3 dark:bg-slate-800 ">
          <View className="flex-row items-center gap-2">
            <Text className="text-muted-foreground">Tipo:</Text>
            <Text className="dark:text-white">FOLHA DE VISTORIA</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-muted-foreground">Posse:</Text>
            <Text className="dark:text-white">{inspectionSheet.posse}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-muted-foreground">Logradouro:</Text>
            <Text className="dark:text-white">
              {inspectionSheet.logradouro}
            </Text>
          </View>
        </View>
      </View>
    </MotiView>
  )
}
