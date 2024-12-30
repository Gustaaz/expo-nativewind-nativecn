import { View } from 'react-native'
import { Card, CardHeader, CardContent, CardFooter } from './ui'
import { Skeleton } from './ui/Skeleton'

export function CardSkeletonSchedule() {
  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center justify-between rounded-md bg-[#F9F9FA] p-6 dark:bg-[#18181A]">
        <View className="gap-0.5">
          <Skeleton className="mb-1 h-4 w-60" />
          <Skeleton className="h-4 w-36" />
        </View>
      </CardHeader>
      <CardContent className="bg-[#FFFFFF] p-6 dark:bg-[#09090B]">
        <View className="gap-3">
          <Skeleton className="mb-1 h-4 w-60" />

          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-36" />
            </View>
            <View className="flex-row items-center justify-between">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-36" />
            </View>
          </View>
        </View>
      </CardContent>
      <CardFooter className="flex-row justify-center rounded-b-md border-t-hairline bg-[#F9F9FA] dark:bg-[#18181A]">
        <View className="py-2 text-xs text-muted-foreground">
          <Skeleton className="mb-1 h-4 w-60" />
        </View>
      </CardFooter>
    </Card>
  )
}
