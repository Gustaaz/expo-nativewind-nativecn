import moment from 'moment'
import { router, useRouter } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { AnimatePresence, View as MotiView } from 'moti'
import { View, TouchableOpacity, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Dialog,
  Badge,
  DialogTrigger,
  DialogContent
} from '../ui'
import { DetailsDocument } from '../details-document'
import { DescriptionProcess } from './description-process'
import { ProcessWithDocuments } from '@/hooks/useScheduleById'
import { useVisible } from '@/hooks/useVisible'
import { DetailsInspectionSheet } from '../details-inspection-sheet'
import { DetailsValue } from '../details-value'
import { TextArea } from '../text-area'
import { updateCancelProcess } from '@/functions/watermelondb/update-cancel-process'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type CardProcessProps = {
  process: ProcessWithDocuments
  idSchedule: string
}

const schemaFormCancel = z.object({
  motivo: z.string({ required_error: 'Motivo obrigatório' })
})

type SchemaFormCancel = z.infer<typeof schemaFormCancel>

export function CardProcess({ process, idSchedule }: CardProcessProps) {
  const { handleToggle, isVisible } = useVisible()
  const { push } = useRouter()
  const { colorScheme } = useColorScheme()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SchemaFormCancel>({
    resolver: zodResolver(schemaFormCancel)
  })

  function handleColorStatus(
    status: 'SINCRONIZADO' | 'PENDENTE' | 'CANCELADO' | 'CONCLUIDO'
  ) {
    switch (status) {
      case 'SINCRONIZADO':
        return 'info'
      case 'PENDENTE':
        return 'warn'
      case 'CANCELADO':
        return 'destructive'
      case 'CONCLUIDO':
        return 'success'
    }
  }

  async function handleCancelProcess(data: SchemaFormCancel) {
    await updateCancelProcess({
      id: process._id,
      motivoCancel: data.motivo
    })

    router.replace(`/(private)/home/schedule/${idSchedule}`)
  }


  return (
    <Card className="w-full">
      <CardHeader className=" gap-4 rounded-md bg-[#F9F9FA] p-6 dark:bg-[#18181A]">
        <View className="flex-row flex-wrap items-center justify-between gap-4">
          <View className="w-full flex-row flex-wrap items-center justify-between gap-4">
            <View className="gap-0.5">
              <View className="flex-row items-center gap-2">
                <CardTitle>Processo</CardTitle>
                <Badge
                  variant={handleColorStatus(process.flgStatus)}
                  label={process.flgStatus}
                />
              </View>
              <CardDescription>{process.protocolo}</CardDescription>
              <CardDescription>
                Data de autuação:{' '}
                {moment(process.dtAutuacao).format('DD/MM/YYYY')}
              </CardDescription>
            </View>
            <View>
              {process.flgStatus !== 'CONCLUIDO' &&
                process.flgStatus !== 'CANCELADO' && (
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        label="Cancelar processo"
                        variant="destructive"
                        size={'sm'}
                        className="mb-2 w-44"
                      />
                    </DialogTrigger>
                    <DialogContent className="w-96">
                      <View className="flex gap-4">
                        <Text className="text-xl font-bold text-primary">
                          Cancelar processo
                        </Text>

                        <Controller
                          control={control}
                          name="motivo"
                          render={({
                            field: { onChange, onBlur, value, ref }
                          }) => (
                            <TextArea
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value || ''}
                              ref={ref}
                              error={errors.motivo && errors.motivo.message}
                              label="Observação"
                              placeholder="Digite a obeservação"
                              className="w-full"
                              labelClasses="text-lg dark:text-white"
                            />
                          )}
                        />

                        <Button
                          label="Cancelar processo"
                          variant="destructive"
                          onPress={handleSubmit(handleCancelProcess)}
                          size={'sm'}
                          className="w-full"
                        />
                      </View>
                    </DialogContent>
                  </Dialog>
                )}
              <View className="flex-row items-center justify-end gap-4">
                <DetailsValue
                  value={process.documents.length.toString()}
                  description="documentos"
                  icon={'file-archive-o'}
                />
                <DetailsValue
                  value={process.inspectionSheets.length.toString()}
                  description="folha de vistoria"
                  icon={'file-text-o'}
                />
              </View>
            </View>
          </View>
          {process.motivoExclusao && (
            <View className="w-full items-center gap-2">
              <Text className="text-primary text-lg font-bold">
                Cancelado: {process.motivoExclusao}
              </Text>
            </View>
          )}
          <Button
            label="Criar folha de vistoria"
            className="h-8 w-full"
            onPress={() =>
              push(
                `/(private)/home/schedule/new-inspectionSheet/${process._id}`
              )
            }
          />
        </View>
        <View className="flex-row flex-wrap items-center gap-2 rounded-md bg-gray-200 p-3 pt-2 dark:bg-slate-800 ">
          <DescriptionProcess title="Assunto" description={process.assunto} />
          <DescriptionProcess title="Classe" description={process.classe} />
          <DescriptionProcess
            title="Interessado"
            description={process.interessado}
          />
          <DescriptionProcess title="Status" description={process.status} />
          <DescriptionProcess title="Classe" description={process.classe} />
          <DescriptionProcess title="Sinopse" description={process.sinopse} />
        </View>
      </CardHeader>
      <CardContent className="rounded-b-md bg-[#FFFFFF] p-6 dark:bg-[#09090B] ">
        <View className="gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="font-bold dark:text-white">Documentos</Text>
            <TouchableOpacity
              onPress={handleToggle}
              className="h-7 w-7 items-center justify-center rounded-md text-primary-foreground"
            >
              <MaterialIcons
                name={isVisible ? 'visibility' : 'visibility-off'}
                size={18}
                color={colorScheme === 'dark' ? 'white' : 'black'}
              />
            </TouchableOpacity>
          </View>
          <AnimatePresence>
            <MotiView>
              {isVisible && (
                <View>
                  {process.inspectionSheets.map((inspectionSheet, index) => {
                    return (
                      <Dialog key={inspectionSheet.id}>
                        <DetailsInspectionSheet
                          index={index}
                          idSchedule={idSchedule}
                          inspectionSheet={inspectionSheet}
                          qtdInspectionSheets={process.inspectionSheets.length}
                        />
                      </Dialog>
                    )
                  })}
                  {process.documents.map((document, index) => {
                    return (
                      <DetailsDocument
                        key={document.id}
                        index={index}
                        document={document}
                        qtdInspectionSheets={process.inspectionSheets.length}
                      />
                    )
                  })}
                </View>
              )}
            </MotiView>
          </AnimatePresence>
        </View>
      </CardContent>
    </Card>
  )
}
