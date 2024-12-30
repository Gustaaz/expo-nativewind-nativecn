import { View } from 'react-native'
import { type VariantProps, cva } from 'class-variance-authority'
const spinnerVariants = cva(
  'm-auto h-6 w-6 animate-spin rounded-full border-2 border-dashed',
  {
    variants: {
      variant: {
        default: 'border-white dark:border-black',
        secondary: 'border-black dark:border-white',
        black: 'border-black',
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export function Spinner({ variant }: VariantProps<typeof spinnerVariants>) {
  return (
    <>
      <View className={spinnerVariants({ variant })} />
    </>
  )
}
