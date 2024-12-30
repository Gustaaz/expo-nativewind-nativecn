import { TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useColorScheme } from 'nativewind'

export function BackButton() {
  const { back } = useRouter()
  const { colorScheme } = useColorScheme()
  return (
    <TouchableOpacity
      onPress={back}
      className="h-7 w-7 items-center justify-center rounded-md text-primary-foreground"
    >
      <FontAwesome name="arrow-left" size={14} color={colorScheme === 'dark' ? 'white' : 'black'} />
    </TouchableOpacity>
  )
}
