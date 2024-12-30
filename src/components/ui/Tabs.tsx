import { cn } from '@/lib/utils'
import { createContext, useContext, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface TabsContextProps {
  activeTab: string
  setActiveTab: (id: string) => void
}
const TabsContext = createContext<TabsContextProps>({
  activeTab: '',
  setActiveTab: () => {}
})

interface TabsProps {
  defaultValue: string
  children: React.ReactNode
}
function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      className={cn('flex flex-row justify-center', className)}
      {...props}
    />
  )
}

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  value: string
  title: string
  textClasses?: string
}
function TabsTrigger({
  value,
  title,
  className,
  textClasses,
  ...props
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useContext(TabsContext)

  return (
    <TouchableOpacity
      className={cn('w-1/2 rounded-md bg-muted px-8 py-3', {
        'bg-foreground': activeTab === value,
        className
      })}
      onPress={() => setActiveTab(value)}
      {...props}
    >
      <Text
        className={cn(
          'text-center font-medium text-muted-foreground',
          { 'text-background': activeTab === value },
          textClasses
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: string
}
function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { activeTab } = useContext(TabsContext)

  if (value === activeTab) return <View className={cn(className)} {...props} />

  return null
}

export { Tabs, TabsList, TabsTrigger, TabsContent }