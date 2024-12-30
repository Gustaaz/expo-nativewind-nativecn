import { TouchableOpacity, View, Text } from 'react-native'
import { DialogTrigger, DialogContent, Button } from './ui'
import { MaterialIcons } from '@expo/vector-icons'
import {
  UseDeleteInspectionProps,
  useDeleteInspection
} from '@/hooks/useDeleteInspection'



export function DialogDeleteInspectionSheet({
  inspectionSheet,
  idSchedule,
  qtdInspectionSheets
}: UseDeleteInspectionProps) {
  const { handleDelete, isLoading } = useDeleteInspection({
    idSchedule,
    inspectionSheet,
    qtdInspectionSheets
  })
  return (
    <>
      <DialogTrigger>
        <TouchableOpacity className="h-7 w-7 items-center justify-center rounded-md text-primary-foreground">
          <MaterialIcons name="delete" size={14} color={'red'} />
        </TouchableOpacity>
      </DialogTrigger>
      <DialogContent>
        <View className="flex max-w-xs gap-4">
          <Text className="text-xl font-bold text-primary">
            Excluir folha de vistoria
          </Text>
          <Text className="font-semibold text-primary">
            Tem certeza que deseja excluir esta folha de vistoria? Essa ação não
            podera ser desfeita.
          </Text>
          <Button
            onPress={handleDelete}
            isloading={isLoading}
            label="Confirmar Exclusão"
          />
        </View>
      </DialogContent>
    </>
  )
}
