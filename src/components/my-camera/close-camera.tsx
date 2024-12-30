import { View, TouchableOpacity } from 'react-native'
import { Icon } from '../icon'

type CloseCameraProps = {
  onClose: () => void
}

export function CloseCamera({ onClose }: CloseCameraProps) {
  return (
    <View className="absolute left-[0.62rem] top-[0.62rem] z-50 self-start">
      <TouchableOpacity
        onPress={onClose}
        className="h-10 w-10 border-spacing-2 items-center justify-center self-center"
      >
        <Icon name="close" color="white" size={32} />
      </TouchableOpacity>
    </View>
  )
}
