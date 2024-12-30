import {
  Image,
  Modal,
  ModalBaseProps,
  TouchableOpacity,
  View
} from 'react-native'
import { ImageSource } from '@/types/imageSource'
import { Icon } from '../icon'
import { Button } from '../ui'
import { useSaveImage } from '@/hooks/useSaveImage'

type GaleryImageProps = ModalBaseProps & {
  id: string
  imageSource: ImageSource[]
  selectImage: (image: ImageSource) => void
  toggleModalImageSource: (image?: ImageSource) => void
}

export function GaleryImage({
  imageSource,
  id,
  selectImage,
  toggleModalImageSource,
  onRequestClose,
  ...props
}: GaleryImageProps) {
  const { saveImages } = useSaveImage()
  
  return (
    <Modal animationType="slide" transparent={false} {...props}>
      <View className="flex-1 gap-5 bg-[#f5f5f5] px-4 py-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={onRequestClose}
            className="h-12 w-12 border-spacing-2 items-center justify-center rounded-full bg-black/40"
          >
            <Icon name="arrow-back" color="white" size={32} />
          </TouchableOpacity>
          <Button
            label="Finalizar"
            onPress={() => saveImages({ id, imageSource })}
          />
        </View>

        <View className="flex-row flex-wrap gap-1">
          {imageSource.map((image, index) => (
            <TouchableOpacity
              delayLongPress={150}
              onPress={() => toggleModalImageSource(image)}
              onLongPress={() => selectImage(image)}
              key={index}
              className="h-24 w-24 items-center justify-center"
            >
              <Image className="h-full w-full" source={image} />
              {image.selected && (
                <View className="absolute z-50 h-24 w-24 items-end bg-black/20">
                  <Icon name="check-box" color="white" size={32} />
                </View>
              )}
            </TouchableOpacity>
          ))}

          {/* {imageBase64.map((image, index) => (
            <TouchableOpacity
              key={index}
              className="h-24 w-24 items-center justify-center"
            >
              <Image className="h-full w-full" source={{ uri: image }} />
            </TouchableOpacity>
          ))} */}
        </View>
      </View>
    </Modal>
  )
}
