import { cn } from '@/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { Text, View } from 'react-native'

const badgeVariants = cva(
  'flex flex-row items-center justify-center rounded-full px-2 py-1 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
        destructive: 'bg-destructive',
        success: 'bg-green-500 dark:bg-green-700',
        warn: 'bg-orange-500 dark:bg-orange-700',
        info: 'bg-blue-500 dark:bg-blue-700'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const badgeTextVariants = cva('font-medium text-center text-xs', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      success: 'text-green-100',
      warn: 'text-yellow-100',
      info: 'text-blue-100'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {
  label: string
  labelClasses?: string
}
function Badge({
  label,
  labelClasses,
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      <Text className={cn(badgeTextVariants({ variant }), labelClasses)}>
        {label}
      </Text>
    </View>
  )
}

export { Badge, badgeVariants }
