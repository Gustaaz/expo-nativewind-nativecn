import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '../ui'

type ModalDialogAddPhotoProps = {
  isOpen: boolean
  handleCloseModal: () => void
  handleNavigateToCamera: () => void
}

export default function ModalDialogAddPhoto({
  isOpen,
  handleCloseModal,
  handleNavigateToCamera
}: ModalDialogAddPhotoProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={isOpen}
      onRequestClose={handleCloseModal}
    >
      <TouchableOpacity className="h-full w-full" onPress={handleCloseModal}>
        <View className="flex flex-1 items-center justify-center bg-black/75">
          <TouchableOpacity
            className="rounded-lg border border-border bg-background p-6 shadow-lg"
            activeOpacity={1}
          >
            <View className="gap-4">
              <Text className="text-lg font-semibold">
                Você dejeja adicionar fotos a esta folha de vistoria?
              </Text>
              <View className="flex-row justify-end gap-2">
                <Button
                  label="Não"
                  variant={'secondary'}
                  onPress={handleCloseModal}
                />
                <Button label="Sim" onPress={handleNavigateToCamera} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}
