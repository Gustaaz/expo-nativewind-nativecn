import { useColorScheme } from 'nativewind'
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export function ModeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme()

  return (
    <TouchableOpacity
      onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
    >
      <FontAwesome
        name={colorScheme === 'dark' ? 'sun-o' : 'moon-o'}
        size={24}
        color={colorScheme === 'dark' ? 'orange' : 'black'}
      />
    </TouchableOpacity>
  )
}
