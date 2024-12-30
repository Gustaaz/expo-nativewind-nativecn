import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'
import { BackButton } from '@/components/back-button'
import { FormInspectionSheet } from '@/components/form-inspectionSheet'
import { Badge } from '@/components/ui'
import { View } from 'moti'
import { ScrollView } from 'react-native-gesture-handler'
import { useFormInspectionSheet } from '@/hooks/useFormInspectionSheet'
import ModalDialogAddPhoto from '@/components/my-camera/modal-dialog-add-photo'

export default function NewInspectionSheet() {
  const { id } = useLocalSearchParams()
  const {
    control,
    handleSubmit,
    errors,
    onError,
    onSubmit,
    isLoading,
    isLoadingPage,
    process,
    isOpen,
    handleCloseModal,
    handleNavigateToCamera
  } = useFormInspectionSheet({ id: id as string })

  return (
    <ScrollView className="flex-1 bg-[#F9F9FA] py-6 dark:bg-zinc-950">
      <View className="justify-start gap-6 px-6 py-6">
        <View className="flex-row flex-wrap items-center justify-between gap-4">
          <View className="flex-row items-center gap-2">
            <BackButton />
            <Text className="text-xl font-semibold dark:text-white">
              Nova folha de vistoria
            </Text>
          </View>
          <Badge label={`Protocolo: ${process.protocolo}`} />
        </View>
        <ModalDialogAddPhoto
          isOpen={isOpen}
          handleNavigateToCamera={handleNavigateToCamera}
          handleCloseModal={handleCloseModal}
        />

        <FormInspectionSheet
          control={control}
          errors={errors}
          isLoadingPage={isLoadingPage}
          handleSubmit={handleSubmit}
          onError={onError}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  )
}
