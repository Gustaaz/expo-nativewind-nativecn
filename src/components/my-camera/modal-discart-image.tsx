import { Modal, View, TouchableOpacity, Text } from 'react-native'
import { Button } from '../ui'
import { ImageSource } from '@/types/imageSource'

interface ModalDiscartImageProps {
  modalDiscarteImage: boolean
  toggleModalDiscarteImage: () => void
  togleDiscartImage: () => void
  imageSource: ImageSource[]
}

export function ModalDiscarteImage({
  modalDiscarteImage,
  toggleModalDiscarteImage,
  togleDiscartImage,
  imageSource
}: ModalDiscartImageProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalDiscarteImage}
      onRequestClose={toggleModalDiscarteImage}
    >
      <View className="flex flex-1 items-center justify-center bg-black/75">
        <TouchableOpacity
          className="rounded-lg border border-border bg-background p-6 shadow-lg"
          activeOpacity={1}
        >
          <View className="gap-4">
            <View>
              <Text className="text-lg font-bold">
                Deseja descartar
                {imageSource.length > 1 ? 'todas as imagens' : 'a imagem'}?
              </Text>
              <Text className="text-md text-gray-600">
                Se voltar agora, você perderá {imageSource.length}{' '}
                {imageSource.length > 1 ? 'imagens' : 'imagem'}.
              </Text>
            </View>
            <View className="flex-row justify-end gap-2">
              <Button
                label="Não"
                variant={'secondary'}
                onPress={toggleModalDiscarteImage}
              />
              <Button
                className="text-red"
                label="Descartar"
                onPress={togleDiscartImage}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
