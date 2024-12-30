import {
  Image,
  Modal,
  ModalBaseProps,
  TouchableOpacity,
  View
} from 'react-native'
import { Icon } from '../icon'

type ImageScreenProps = ModalBaseProps & {
  imageSourceSelected: string
}

export function ImageScreen({
  imageSourceSelected,
  onRequestClose,
  ...props
}: ImageScreenProps) {
  return (
    <Modal animationType="slide" transparent={false} {...props}>
      <View className="flex-1 bg-[#f5f5f5] px-2 pb-2">
        <View className="absolute left-2 self-end z-50 h-20 w-full justify-center bg-black/20 ">
          <TouchableOpacity
            onPress={onRequestClose}
            className=" h-12 w-12 border-spacing-2 items-center justify-center "
          >
            <Icon name="arrow-back" color="white" size={32} />
          </TouchableOpacity>
        </View>

        <Image className="h-full w-full" source={{uri: imageSourceSelected}} />
      </View>
    </Modal>
  )
}
