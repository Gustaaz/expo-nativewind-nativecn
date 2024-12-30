import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer'
import { Text, TouchableOpacity, View } from 'react-native'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth-context'
import { Icon } from '../icon'

export function DrawerCustom(navigation: DrawerContentComponentProps) {
  const { signOut } = useContext(AuthContext)
  const colorIconSingOut = ['#ff0000', '#ff0000']
  return (
    <View className="flex-1 dark:bg-zinc-950">
      <DrawerContentScrollView {...navigation}>
        <View className="flex-1 pt-5">
          <DrawerItemList {...navigation} />
        </View>
      </DrawerContentScrollView>
      <View className="mb-5 px-2">
        <TouchableOpacity
          onPress={signOut}
          className="flex flex-row items-center justify-start rounded-md p-3"
        >
          <Icon name="exit-to-app" size={24} colors={colorIconSingOut} />
          <Text className="ml-2 dark:text-white">Sair</Text>
        </TouchableOpacity>
        {/* <Button label="Sair" variant={'secondary'} onPress={signOut} /> */}
      </View>
    </View>
  )
}
