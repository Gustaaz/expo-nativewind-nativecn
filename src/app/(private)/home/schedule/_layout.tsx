import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <>
      <Stack initialRouteName="[id]">
        <Stack.Screen
          name="[id]"
          options={{ headerShown: false, freezeOnBlur: true }}
        />
        <Stack.Screen
          name="new-inspectionSheet/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="update-inspectionSheet/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="document-pdf/[edoc]"
          options={{ headerShown: true, title: 'Documento' }}
        />
        <Stack.Screen name="camera-device/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}
