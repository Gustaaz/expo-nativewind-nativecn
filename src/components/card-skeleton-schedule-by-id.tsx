import { View } from 'react-native'
import { Card, CardHeader, CardContent, CardFooter } from './ui'
import { Skeleton } from './ui/Skeleton'

export function CardSkeletonScheduleById() {
  return (
    <>
      <Card className="w-full bg-[#FFFF]  dark:bg-[#18181A]">
        <CardHeader>
          <Skeleton className="mb-1 h-4 w-60" />
          <Skeleton className="h-4 w-36" />
        </CardHeader>
        <CardContent className="w-full flex-row gap-4">
          <View>
            <View className="flex-row items-center gap-3 pb-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-4 w-10" />
            </View>
            <View>
              <Skeleton className="h-4 w-16" />
            </View>
          </View>
          <View>
            <View className="flex-row items-center gap-3 pb-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-4 w-10" />
            </View>
            <View>
              <Skeleton className="h-4 w-16" />
            </View>
          </View>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between rounded-md bg-[#F9F9FA] p-6 dark:bg-[#18181A]">
          <View className="gap-0.5">
            <Skeleton className="mb-1 h-4 w-60" />

            <Skeleton className="h-4 w-36" />

            <Skeleton className="h-4 w-32" />
          </View>
          <Skeleton className="mb-1 h-6 w-32" />
        </CardHeader>
        <CardContent className="rounded-b-md bg-[#FFFFFF] p-6 dark:bg-[#09090B] ">
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Skeleton className="h-4 w-32" />

              <Skeleton className="mb-1 h-7 w-8" />
            </View>
          </View>
        </CardContent>
        <CardFooter className="flex-row justify-center rounded-b-md border-t-hairline bg-[#F9F9FA] dark:bg-[#18181A]">
          <View className="py-2 text-xs text-muted-foreground">
            <Skeleton className="h-4 w-60" />
          </View>
        </CardFooter>
      </Card>
    </>
  )
}
