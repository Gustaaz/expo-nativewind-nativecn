import { Text, View } from 'react-native'

type DescriptionProcessProps = {
  title: string
  description: string
}

export function DescriptionProcess({
  description,
  title
}: DescriptionProcessProps) {
  return (
    <View className="flex-row flex-wrap items-center gap-1">
      <Text className="text-muted-foreground">{title}:</Text>
      <Text className="dark:text-white">{description}</Text>
    </View>
  )
}
