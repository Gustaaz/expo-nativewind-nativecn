import { Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'

interface DetailsValueProps {
  value: string
  description?: string
  icon?: keyof typeof FontAwesome.glyphMap
}

export function DetailsValue({ value, description, icon }: DetailsValueProps) {
  const { colorScheme } = useColorScheme()

  return (
    <View>
      <View className="flex-row items-center gap-3 pb-2">
        {icon && (
          <FontAwesome
            name={icon}
            size={18}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        )}
        <Text className="text-2xl font-bold dark:text-white">{value}</Text>
      </View>
      {description && (
        <View>
          <Text className="text-xs text-muted-foreground ">{description}</Text>
        </View>
      )}
    </View>
  )
}
