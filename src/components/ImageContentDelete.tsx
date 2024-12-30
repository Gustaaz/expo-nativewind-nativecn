import { View, TouchableOpacity, Image, Text } from 'react-native'
import { Icon } from './icon'
import { ImageScreen } from './my-camera'
import { Image64Model } from '@/database/model'
import { useDeleteImages } from '@/hooks/useDeleteImages'
import { Button } from './ui'

type ImageSourceProps = {
  id: string
  imagesSources: Image64Model[]
  setImagesSources: (value: Image64Model[]) => void
}

export function ImageContentDelete({
  id,
  imagesSources,
  setImagesSources
}: ImageSourceProps) {
  const {
    deleteImagesSelected,
    handleImagePress,
    imageModalVisible,
    selectedImageURI,
    selectedImages,
    toggleImageSelection,
    toogleSelectAll,
    onRequestClose
  } = useDeleteImages({
    id: id as string,
    imagesSources,
    setImagesSources
  })
  return (
    <>
      <View className="flex-1 flex-row flex-wrap items-center gap-1 rounded-md bg-[#FFFFFF] p-4 dark:bg-[#15151a]">
        {imagesSources.length > 0 ? (
          <>
            {imagesSources.map((image, index) => (
              <TouchableOpacity
                delayLongPress={150}
                onLongPress={() => toggleImageSelection(image)}
                key={index}
                onPress={() => handleImagePress(image)}
                className="relative h-24 w-24"
              >
                <Image
                  source={{
                    uri: `data:image/png;base64,${image.base64}`
                  }}
                  className="h-full w-full rounded-md"
                />
                {selectedImages.find(
                  (selectedImage) => selectedImage.base64 === image.base64
                ) && (
                  <View className="absolute z-50 h-24 w-24 items-end bg-black/20">
                    <Icon name="check-box" color="white" size={32} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
            <ImageScreen
              visible={imageModalVisible}
              imageSourceSelected={selectedImageURI}
              onRequestClose={onRequestClose}
            />
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
            <View className="flex-row items-center justify-center gap-1">
              <Icon name="image-not-supported" size={32} />
              <Text className="text-center text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Nenhuma imagem encontrada
              </Text>
            </View>
          </View>
        )}
      </View>
      {imagesSources.length > 0 && (
        <View className="mt-5 h-20 w-full flex-row justify-end gap-3 rounded-md bg-[#FFFFFF] p-4 pt-5 dark:bg-[#15151a]">
          <TouchableOpacity
            className="flex h-10 flex-row items-center justify-center rounded-md bg-destructive px-4 disabled:opacity-25"
            disabled={selectedImages.length === 0}
            onPress={deleteImagesSelected}
          >
            <Text className="text-center text-base font-medium text-white">
              Excluir
            </Text>
          </TouchableOpacity>

          <Button
            label="Selecionar todos"
            onPress={toogleSelectAll}
            variant={'default'}
          />
        </View>
      )}
    </>
  )
}
