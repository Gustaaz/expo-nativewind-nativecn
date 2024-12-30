import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { Text, TextInput, View } from 'react-native'

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string
  labelClasses?: string
  inputClasses?: string
  error?: string
  children?: React.ReactNode
}
const TextArea = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    { className, label, labelClasses, inputClasses, error, children, ...props },
    ref
  ) => (
    <View className={cn('flex flex-col gap-1.5', className)}>
      {label && <Text className={cn('text-base text-primary', labelClasses)}>{label}</Text>}
      <View
        className={cn(
          inputClasses,
          'focus-visible:outline-noner h-24  flex-row rounded-md border border-input bg-background  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#18181A] dark:text-white'
        )}
      >
        <TextInput
          className="flex-1 px-4 py-2.5 align-top dark:text-gray-100 dark:placeholder:text-gray-400"
          multiline
          numberOfLines={6}
          {...props}
        />
        {children}
      </View>
      {error && <Text className="text-sm text-red-500">{error}</Text>}
    </View>
  )
)

export { TextArea }
