import { TextInput, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export function Search() {
  return (
    <View className="focus-visible:outline-noner h-12 w-full flex-row items-center gap-4 rounded-md border border-input bg-background px-4 py-2.5 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:grow-0">
      <FontAwesome name="search" color={'#9CA3AF'} />
      <TextInput
        id="search"
        placeholder="Pesquisar..."
        className="rounded-lg bg-background dark:text-white dark:placeholder:text-gray-300"
      />
    </View>
  )
}
