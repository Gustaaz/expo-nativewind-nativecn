import { Text, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { useColorScheme } from 'nativewind'
import { MaterialIcons } from '@expo/vector-icons'

type Options = {
  key: string
  value: string
}

type BuildingDataProps = {
  title: string
  options: Options[]
  onChange: (value: string) => void
  error?: string
  value?: Options
}

export function BuildingData({
  title,
  options,
  onChange,
  error,
  value
}: BuildingDataProps) {
  const { colorScheme } = useColorScheme()
  const bgColor = colorScheme === 'dark' ? '#18181A' : 'white'
  const textColor = colorScheme === 'dark' ? 'white' : 'black'

  return (
    <>
      <View className="gap-2">
        <Text className="text-sm font-bold dark:text-white">{title}</Text>
        <SelectList
          boxStyles={{ width: 250, backgroundColor: bgColor }}
          dropdownStyles={{ width: 250, backgroundColor: bgColor }}
          disabledTextStyles={{ color: textColor }}
          dropdownTextStyles={{ color: textColor }}
          inputStyles={{ fontWeight: value && 'bold', color: textColor }}
          search={false}
          defaultOption={value && { key: value.key, value: value.value }}
          arrowicon={
            <MaterialIcons
              name="keyboard-arrow-down"
              size={18}
              color={textColor}
            />
          }
          data={options}
          // save="value"
          placeholder="Selecione uma opção"
          setSelected={onChange}
        />
        {error && <Text className="text-sm text-red-500">{error}</Text>}
      </View>
    </>
  )
}
