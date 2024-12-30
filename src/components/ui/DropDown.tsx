/* eslint-disable prettier/prettier */
import { cn } from '@/lib/utils'
import React, { cloneElement, createContext, useContext, useState } from 'react'
import { Text, View } from 'react-native'

interface DropDownContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropDownContext = createContext<DropDownContextType | undefined>(
  undefined
)

const DropDown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <DropDownContext.Provider value={{ open, setOpen }}>
      <View className="relative">{children}</View>
    </DropDownContext.Provider>
  )
}

const DropDownTrigger = ({ children }: any) => {
  const { open,setOpen } = useDropdown()
  return cloneElement(children, {
    onPress: () => setOpen(!open)
  })
}

type DropDownContentTypes = {
  className?: string
  children: React.ReactNode
}

const DropDownContent = ({ className, children }: DropDownContentTypes) => {
  const { open } = useDropdown()
  return (
    <>
      {open && (
        <View
          className={cn(
            'absolute top-12 z-50 mx-auto mt-3 flex w-full min-w-[8rem] justify-center gap-3 overflow-hidden rounded-md border border-border bg-background p-3 text-popover-foreground shadow-md',
            className
          )}
        >
          {children}
        </View>
      )}
    </>
  )
}

type DropDownLabelProps = {
  labelTitle: string
}

const DropDownLabel = ({ labelTitle }: DropDownLabelProps) => {
  return (
    <Text className="text-xl font-semibold text-primary">{labelTitle}</Text>
  )
}

type DropDownItemProps = {
  children: React.ReactNode
  className?: string
}

const DropDownItem = ({ children, className }: DropDownItemProps) => {
  return (
    <View className={cn('rounded-md border border-border p-2', className)}>
      {children}
    </View>
  )
}

const DropDownItemSeparator = () => {
  return <View className="h-[1px] flex-1 bg-border" />
}
const useDropdown = () => {
  const context = useContext(DropDownContext)
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider')
  }
  return context
}
export {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownLabel,
  DropDownItemSeparator,
  DropDownItem,
  useDropdown
}
