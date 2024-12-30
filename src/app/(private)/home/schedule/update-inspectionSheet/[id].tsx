import { router, useLocalSearchParams } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'
import { BackButton } from '@/components/back-button'
import { FormInspectionSheet } from '@/components/form-inspectionSheet'
import {
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui'
import { View } from 'moti'
import { ScrollView } from 'react-native-gesture-handler'
import { useUpdateInspection } from '@/hooks/useUpdateInspectionSheet'
import { Icon } from '@/components/icon'
import { ImageContentDelete } from '@/components/ImageContentDelete'

export default function UpdateInspectionSheet() {
  const { id } = useLocalSearchParams()

  const {
    control,
    handleSubmit,
    errors,
    handleUpdateInspectionSheet,
    setImagesSources,
    isLoading,
    isLoadingPage,
    protocolo,
    imagesSources
  } = useUpdateInspection(id as string)

  return (
    <ScrollView className="flex-1 bg-[#F9F9FA] py-6 dark:bg-zinc-950">
      <View className="flex flex-col gap-6 px-6 py-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <BackButton />
            <Text className="text-xl font-semibold dark:text-white">
              Atualizar folha de vistoria
            </Text>
          </View>
          <View className="flex-row gap-2">
            {protocolo && <Badge label={`Protocolo: ${protocolo}`} />}
            <TouchableOpacity
              onPress={() =>
                router.push(`/(private)/home/schedule/camera-device/${id}`)
              }
            >
              <Icon name="camera-alt" size={32} />
            </TouchableOpacity>
          </View>
        </View>

        <Tabs defaultValue="form">
          <TabsList>
            <TabsTrigger id="form" title="Formulário" value="form" />
            <TabsTrigger id="images" title="Imagens" value="images" />
          </TabsList>
          <TabsContent value="form">
            <FormInspectionSheet
              control={control}
              handleSubmit={handleSubmit}
              errors={errors}
              isLoading={isLoading}
              isLoadingPage={isLoadingPage}
              onSubmit={handleUpdateInspectionSheet}
            />
          </TabsContent>
          <TabsContent value="images">
            <ImageContentDelete
              id={id as string}
              imagesSources={imagesSources}
              setImagesSources={setImagesSources}
            />
          </TabsContent>
        </Tabs>
      </View>
    </ScrollView>
  )
}
