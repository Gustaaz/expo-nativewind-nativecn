import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from '@/context/auth-context'
import { ToastProvider } from '@/components/ui'
import '../styles/global.css'
export default function Layout() {
  return (
    <AuthProvider>
      <ToastProvider position="top">
        <StatusBar />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(private)" options={{ headerShown: false }} />
        </Stack>
      </ToastProvider>
    </AuthProvider>
  )
}
