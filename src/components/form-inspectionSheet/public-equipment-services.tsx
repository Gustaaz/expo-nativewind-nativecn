import { View, Text } from 'react-native'
import { Switch } from '../ui'

type PublicEquipmentServicesProps = {
  title: string
  onChange: () => void
  value: boolean
}

export function PublicEquipmentServices({
  title,
  onChange,
  value
}: PublicEquipmentServicesProps) {
  return (
    <View className="basis-[49%] flex-row items-center justify-between py-2">
      <Text className="text-sm font-bold dark:text-white">{title}</Text>
      <Switch
        onValueChange={onChange}
        value={value}
        trackColor={{ false: '#D9D9D9', true: 'green' }}
      />
    </View>
  )
}
