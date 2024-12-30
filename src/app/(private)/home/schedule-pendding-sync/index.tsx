import { ScrollView, Text, View } from 'react-native'
import { BackButton } from '@/components/back-button'
import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/ui'
import { usePendingSchedules } from '@/hooks/usePendingSchedules'
import { CheckboxPedding } from '@/components/schedule-pendding-sync/checkbox-pedding'

export default function SchedulePenddingSync() {
  const {
    schedules,
    // handleSelectAll,
    handleStatusChange,
    setSchedules,
    handleSync,
    progress,
    documentCurrent,
    totalDocument,
    isLoading
  } = usePendingSchedules()
  return (
    <ScrollView className="flex-1 bg-[#F9F9FA] px-4 py-6 dark:bg-zinc-950">
      <View className="mb-6 justify-start gap-6">
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-row items-center gap-2">
            <BackButton />
            <Text className="text-xl font-semibold dark:text-white">
              Sinronizar agendamentos
            </Text>
          </View>
          <Dialog>
            <DialogTrigger>
              <Button label="Sincronizar" />
            </DialogTrigger>
            <DialogContent>
              <View className="flex max-w-sm gap-4">
                <Text className="text-xl font-semibold text-primary">
                  Deseja sincronizar?
                </Text>
                <View className="justify-centeri flex-col items-center gap-2">
                  {isLoading && (
                    <Badge
                      label="Não interropa a sincronização de agendamentos, pois a
                      interrupção pode levar a duplicação, perda ou
                      inconsistências de dados."
                      className="rounded-md bg-amber-400"
                      labelClasses="font-semibold text-lg text-black"
                    />
                  )}

                  <Text className="text-primary">
                    {isLoading
                      ? // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
                        `Total de documento a sincronizar`
                      : 'A sincronizacao agendamentos vai levar alguns minutos'}
                  </Text>
                  {isLoading && (
                    <Text className="text-xl font-bold text-primary dark:text-white">
                      {documentCurrent} / {totalDocument}
                    </Text>
                  )}
                  {isLoading && (
                    <View className="mb-2 max-w-xs flex-row items-center justify-center gap-2">
                      <View className="m-auto h-16 w-16 animate-spin rounded-full border-2 border-dashed dark:border-white" />
                      <Text className='text-primary absolute'>
                        {progress.toString()} %
                      </Text>
                    </View>
                  )}
                  <Button
                    className="w-full"
                    label="Sincronizar"
                    disabled={isLoading}
                    onPress={handleSync}
                  />
                </View>
                <Text className="text-primary">
                  Toque fora do quadro para fechar
                </Text>
              </View>
            </DialogContent>
          </Dialog>
        </View>
        <View className="w-full gap-4 px-10">
          <View className="w-full flex-1 items-start gap-4 ">
            {/* <Checkbox
              label="Selecionar todos"
              isChecked={schedules.every(
                (item) => item.status === 'SINCRONIZADO'
              )}
              toggleCheckbox={() => handleSelectAll(schedules, setSchedules)}
            /> */}
            {schedules.map((schedule, index) => (
              <CheckboxPedding
                key={schedule.id}
                schedule={schedule}
                index={index}
                handleStatusChange={handleStatusChange}
                setSchedulePending={setSchedules}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
