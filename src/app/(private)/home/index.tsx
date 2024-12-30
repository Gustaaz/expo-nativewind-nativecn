import { ScrollView, View } from 'react-native'
import { AnimatePresence } from 'moti'
import { Search } from '@/components/search'
import { CardSchedule } from '@/components/card-schedule'
import { CardSkeletonSchedule } from '@/components/card-skeleton-schedule'
import { CardNoContentSchedule } from '@/components/card-noContent-schedule'
import { useHome } from '@/hooks/useHome'
import { Button } from '@/components/ui'
// import { removeDuplicatesDocuments } from '@/functions/watermelondb/delete-duplicates'
import { useState } from 'react'

export default function Home() {
  const { isLoading, schedules } = useHome()
  // const [isLoadingDuplicate, setIsLoading] = useState(false)


  const onRemoveDuplicatesDocuments = async () => {
    // setIsLoading(true)
    // await removeDuplicatesDocuments()
    // setIsLoading(false)
  }
  
  return (
    <ScrollView className="flex-1 bg-[#F9F9FA] p-6 dark:bg-zinc-950">
      {/* <Button label='duplicates' onPress={onRemoveDuplicatesDocuments} isloading={isLoadingDuplicate}/> */}
      <View className="mb-6 items-center justify-start gap-6 sm:px-16 sm:py-6">
        <Search />
        {isLoading && (
          <>
            <CardSkeletonSchedule />
            <CardSkeletonSchedule />
            <CardSkeletonSchedule />
          </>
        )}

        {schedules.length === 0 && !isLoading && <CardNoContentSchedule />}

        <AnimatePresence>
          {schedules.length > 0 &&
            !isLoading &&
            schedules.map((item, index) => (
              <CardSchedule index={index} key={item._id} schedules={item} />
            ))}
        </AnimatePresence>
      </View>
    </ScrollView>
  )
}
