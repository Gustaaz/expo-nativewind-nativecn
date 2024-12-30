import { View, TouchableOpacity, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { DocumentModel } from '@/database/model'
import { MotiView } from 'moti'
import { router } from 'expo-router'

type DetailsDocumentProps = {
  document: DocumentModel
  index: number
  qtdInspectionSheets: number
}

export function DetailsDocument({
  document,
  index,
  qtdInspectionSheets
}: DetailsDocumentProps) {

  function handleNavigate() {
    router.push(`/(private)/home/schedule/document-pdf/${document.eDoc}`)
  }

  return (
    <MotiView
      key={index}
      transition={{
        delay: (qtdInspectionSheets + index) * 100,
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
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Text className="font-semibold dark:text-white">e-Doc:</Text>
            <Text className="font-bold dark:text-white">{document.eDoc}</Text>
          </View>
          <TouchableOpacity
            onPress={handleNavigate}
            className="h-7 w-7 items-center justify-center rounded-md text-primary-foreground"
          >
            <MaterialIcons name="picture-as-pdf" size={14} color={'red'} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center gap-2 rounded-md bg-gray-200 p-3 dark:bg-slate-800 ">
          <Text className="text-muted-foreground">Tipo:</Text>
          <Text className="dark:text-white">{document.tipoDocumento}</Text>
        </View>
      </View>
    </MotiView>
  )
}
