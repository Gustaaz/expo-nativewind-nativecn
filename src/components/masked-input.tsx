import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { Text, TextInput, View } from 'react-native'
import MaskInput, { Mask } from 'react-native-mask-input'

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string
  labelClasses?: string
  inputClasses?: string
  error?: string
  children?: React.ReactNode
  mask: Mask | undefined
}
const MaskedInput = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    {
      className,
      label,
      labelClasses,
      inputClasses,
      error,
      children,
      mask,
      ...props
    },
    ref
  ) => (
    <View className={cn('flex flex-col gap-1.5', className)}>
      {label && <Text className={cn('text-base', labelClasses)}>{label}</Text>}
      <View
        className={cn(
          inputClasses,
          'focus-visible:outline-noner w-full flex-row rounded-md border border-input bg-background  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#18181A] dark:text-white'
        )}
      >
        <MaskInput
          ref={ref}
          mask={mask}
          className="flex-1 px-4 py-2.5 dark:text-gray-100 dark:placeholder:text-gray-400"
          {...props}
        />
        {children}
      </View>
      {error && <Text className="text-sm text-red-500">{error}</Text>}
    </View>
  )
)

export { MaskedInput }
