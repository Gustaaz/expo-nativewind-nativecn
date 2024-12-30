import { router } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { ModeToggle } from '../mode-toggle'
import { usePendingSchedules } from '@/hooks/usePendingSchedules'
import { Icon } from '../icon'
import { Badge } from '../ui'

export function HeaderRight() {
  const { schedules } = usePendingSchedules()

  return (
    <View className="mr-4 flex-row items-center gap-3">
      {schedules.length > 0 && (
        <TouchableOpacity
          onPress={() =>
            router.push('/(private)/home/schedule-pendding-sync/')
          }
        >
          <View className='flex-row items-center'>
            <Badge label={schedules.length.toString()} />
            <Icon name="sync" size={24} />
          </View>
        </TouchableOpacity>
      )}
      <ModeToggle />
    </View>
  )
}
