import { useColorScheme } from 'nativewind'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { DrawerCustom, HeaderRight } from '@/components/drawer-custom'

export default function Layout() {
  const { colorScheme } = useColorScheme()
  const colorMode = colorScheme === 'dark' ? '#F5f5f5' : '#18181B'
  const bgMode = colorScheme === 'dark' ? '#18181B' : 'white'

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerCustom {...props} />}
        screenOptions={{
          headerRight: () => <HeaderRight />,
          headerTintColor: colorMode,
          headerStyle: {
            backgroundColor: bgMode
          },
          headerTitleStyle: {
            color: colorMode
          },
          drawerActiveTintColor: colorMode,
          drawerInactiveTintColor: colorMode
        }}
      >
        <Drawer.Screen
          name="index"
          options={{ title: 'Inicio', unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="schedule"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Agendamento',
            unmountOnBlur: true
          }}
        />
        <Drawer.Screen
          name="schedule-pendding-sync/index"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Agendamento-Pendente'
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
