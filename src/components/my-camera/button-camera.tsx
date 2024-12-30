import React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { TouchableOpacity } from 'react-native'

const buttonVariants = cva(
  'absolute h-16 w-16 items-center justify-center self-center rounded-full bottom-16',
  {
    variants: {
      variant: {
        default: 'h-20 w-20 border-4 border-white',
        left: 'left-36',
        right: 'right-36 bg-black/50'
      },
      size: {
        default: 'h-20 w-20',
        sm: 'h-16 w-16'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

const ButtonCamera = React.memo(
  ({ className, variant, size, children, ...props }: ButtonProps) => {
    const classNames = buttonVariants({ variant, size, className })
    return (
      <TouchableOpacity {...props} className={classNames}>
        {children}
      </TouchableOpacity>
    )
  }
)
ButtonCamera.displayName = 'Button'

export { ButtonCamera, buttonVariants }
