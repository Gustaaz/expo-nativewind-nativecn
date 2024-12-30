import { MaterialIcons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import { OpaqueColorValue } from 'react-native'

interface IconProps extends React.ComponentProps<typeof MaterialIcons> {
  colors?: string[] | OpaqueColorValue[]
}

export const Icon = ({
  name,
  colors = ['#F5f5f5', '#18181B'],
  size = 24,
  ...rest
}: IconProps) => {
  const colorMode =
    useColorScheme().colorScheme === 'dark' ? colors[0] : colors[1]

  return <MaterialIcons name={name} size={size} color={colorMode} {...rest}/>
}
