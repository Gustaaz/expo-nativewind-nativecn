import { type VariantProps, cva } from 'class-variance-authority'
import { Text, TouchableOpacity, View } from 'react-native'
import { cn } from '@/lib/utils'
import { Spinner } from '../spinner'
import React from 'react'

const buttonVariants = cva(
  'flex flex-row items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
        destructive: 'bg-destructive',
        ghost: 'bg-slate-700',
        link: 'text-primary underline-offset-4'
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 px-2',
        lg: 'h-12 px-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const buttonTextVariants = cva('text-center font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      ghost: 'text-primary-foreground',
      link: 'text-primary-foreground underline'
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-xl'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label: string
  labelClasses?: string
  isloading?: boolean
}
const Button = React.memo(
  ({
    label,
    labelClasses,
    className,
    variant,
    isloading,
    size,
    disabled: _disabled,
    ...props
  }: ButtonProps) => {
    const classNames = buttonVariants({ variant, size, className })
    const textClasses = buttonTextVariants({
      variant,
      size,
      className: labelClasses
    })
    const disabled = isloading || _disabled || false
    const spinner = isloading && <Spinner />

    return (
      <TouchableOpacity
        className={`${isloading || _disabled ? 'opacity-50' : 'opacity-100'} ${classNames}`}
        {...props}
        disabled={disabled}
      >
        <Text className={textClasses}>{spinner || label}</Text>
      </TouchableOpacity>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants, buttonTextVariants }
