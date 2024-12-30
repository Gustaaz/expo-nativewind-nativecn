import { Text, TouchableOpacity, View } from 'react-native'
import { cn } from '@/lib/utils'

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof View> {
  label?: string
  description?: string
  descriptionClasses?: string
  labelClasses?: string
  checkboxClasses?: string
  isChecked?: boolean
  toggleCheckbox?: () => void
}
function Checkbox({
  label,
  labelClasses,
  description,
  descriptionClasses,
  checkboxClasses,
  className,
  isChecked,
  toggleCheckbox,
  ...props
}: CheckboxProps) {
  const isCheckedClass = `${isChecked ? 'text-gray-400 line-through' : 'text-gray-800'} dark:${isChecked ? 'text-gray-400 line-through' : 'text-white'} `

  return (
    <View
      className={cn('flex flex-row items-center gap-2', className)}
      {...props}
    >
      <TouchableOpacity onPress={toggleCheckbox}>
        <View className="flex-row items-center gap-2">
          <View
            className={cn(
              'flex h-4 w-4 items-center justify-center rounded border border-gray-700 bg-background',
              {
                'bg-foreground': isChecked
              },
              checkboxClasses
            )}
          >
            {isChecked && <Text className="text-xs text-background">✓</Text>}
          </View>
          <View className="">
            {label && (
              <Text className={cn(isCheckedClass, labelClasses)}>{label}</Text>
            )}
            {description && (
              <Text className={cn(isCheckedClass, descriptionClasses)}>
                {description}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export { Checkbox }
