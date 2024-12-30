import { Text, View } from 'react-native'
import {
  Control,
  Controller,
  FormState,
  UseFormHandleSubmit
} from 'react-hook-form'
import { Button, Input } from '../ui'
import { PublicEquipmentServices } from './public-equipment-services'
import { BuildingData } from './building-data'
import { publicServices } from '@/const/public-services'
import { buildingData } from '@/const/building-data'
import { MaskedInput } from '../masked-input'
import { TextArea } from '../text-area'
import { PublicServicesEnum } from '@/types/publicServicesEnum'
import { BuildingDataEnum } from '@/types/buildingDataEnum'
import { AREA_CONSTRUIDA_MASK } from '@/const/area-construida-mask'
import { INSC_CADASTRAL_MASK } from '@/const/insc-cadastral-mask'
import { Spinner } from '../spinner'
import { InspectionSheet } from '@/types/inspection'

type FormInspectionSheetProps = {
  control: Control<InspectionSheet>
  handleSubmit: UseFormHandleSubmit<InspectionSheet>
  errors: FormState<InspectionSheet>['errors']
  onError?: (error: unknown) => void
  onSubmit: (data: InspectionSheet) => Promise<void>
  isLoading: boolean
  isLoadingPage: boolean
}
export function FormInspectionSheet({
  control,
  handleSubmit,
  onError,
  onSubmit,
  isLoading,
  isLoadingPage,
  errors
}: FormInspectionSheetProps) {
  return (
    <>
      {isLoadingPage && (
        <View className="w-full items-center gap-4 p-6">
          <Spinner variant={'secondary'} />
        </View>
      )}
      {!isLoadingPage && (
        <View className="w-full gap-4 rounded-md bg-[#FFFFFF] p-6 dark:bg-[#15151a]">
          <View className="flex-1 items-start gap-4 ">
            <Controller
              control={control}
              name="logradouro"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  ref={ref}
                  error={errors.logradouro && errors.logradouro.message}
                  label="Logradouro"
                  placeholder="Rua Aquarios"
                  className="w-full gap-2 "
                  labelClasses="text-lg dark:text-white"
                />
              )}
            />

            <Controller
              control={control}
              name="insc_cadastral"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <MaskedInput
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  mask={INSC_CADASTRAL_MASK}
                  label="Inscricão Cadastral"
                  keyboardType="numeric"
                  className="w-full gap-2"
                  labelClasses="text-lg dark:text-white"
                  placeholder="00.000.000.0000.000"
                  error={errors.insc_cadastral && errors.insc_cadastral.message}
                />
              )}
            />

            <Controller
              control={control}
              name="nPredial"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value?.toString()}
                  ref={ref}
                  error={errors.nPredial && errors.nPredial.message}
                  label="N° Predial"
                  keyboardType="numeric"
                  placeholder="0000"
                  className="w-full gap-2"
                  labelClasses="text-lg dark:text-white"
                />
              )}
            />

            <Controller
              control={control}
              name="area_construida"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <MaskedInput
                  onChangeText={onChange}
                  value={value}
                  ref={ref}
                  onBlur={onBlur}
                  keyboardType="decimal-pad"
                  label="Area construída (m²)"
                  className="w-full gap-2"
                  placeholder="0,000(m²)"
                  labelClasses="text-lg dark:text-white"
                  mask={AREA_CONSTRUIDA_MASK}
                  error={
                    errors.area_construida && errors.area_construida.message
                  }
                />
              )}
            />

            <Text className="text-2xl font-bold dark:text-white">
              Equipamentos e serviços públicos existentes na rua
            </Text>
            <View className="flex flex-row flex-wrap justify-between gap-2">
              {publicServices.map((service) => (
                <Controller
                  key={service.name}
                  control={control}
                  name={service.name as PublicServicesEnum}
                  render={({ field: { onChange, value } }) => (
                    <PublicEquipmentServices
                      onChange={onChange}
                      value={value as boolean}
                      title={service.title}
                    />
                  )}
                />
              ))}
            </View>

            <Text className="text-2xl font-bold dark:text-white">
              Dados da edificação
            </Text>
            <View className="flex flex-row flex-wrap justify-between gap-4">
              {buildingData.map((data) => {
                return (
                  <Controller
                    key={data.name}
                    control={control}
                    name={data.name as BuildingDataEnum}
                    render={({ field: { onChange, name, value } }) => {
                      return (
                        <BuildingData
                          onChange={onChange}
                          value={data.options.find(
                            (option) => option.value === value
                          )}
                          options={data.options}
                          title={data.title}
                          error={errors[name]?.message}
                        />
                      )
                    }}
                  />
                )
              })}
            </View>

            <Controller
              control={control}
              name="posse"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  ref={ref}
                  error={errors.posse && errors.posse.message}
                  label="Posse"
                  placeholder="Digite a posse"
                  className="w-full gap-2 "
                  labelClasses="text-lg dark:text-white"
                />
              )}
            />

            <Controller
              control={control}
              name="observacao"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextArea
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value || ''}
                  ref={ref}
                  error={errors.observacao && errors.observacao.message}
                  label="Observação"
                  placeholder="Digite a obeservação"
                  className="w-full"
                  labelClasses="text-lg dark:text-white"
                />
              )}
            />

            <Button
              onPress={handleSubmit(onSubmit, onError)}
              label="Salvar"
              className="w-full"
              isloading={isLoading}
            />
          </View>
        </View>
      )}
    </>
  )
}
