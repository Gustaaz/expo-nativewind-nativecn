import { Text, View } from 'react-native'
import { Controller } from 'react-hook-form'
import { Button, Input } from '@/components/ui'
import { MaterialIcons } from '@expo/vector-icons'
import { useSignIn } from '@/hooks/useSignIn'
import { Icon } from '@/components/icon'

export default function App() {
  const {
    errors,
    isLoad,
    control,
    showPassword,
    onSignIn,
    handleSubmit,
    toggleShowPassword
  } = useSignIn()

  return (
    <View className="flex-1 justify-center dark:bg-slate-950">
      <View className="items-center justify-center py-12">
        <View className="w-full gap-6 px-4">
          <View className="items-center gap-2">
            <View className='flex-row gap-2 items-baseline'>   
            <Text className="text-3xl font-bold dark:text-white">
              e-Vista-Mobile
            </Text>
            <Text className="text-xs text-gray-600">
              {process.env.EXPO_PUBLIC_VERSION}
            </Text>
            </View>
            <Text className="text-sm text-muted-foreground">
              Digite seu e-mail abaixo para fazer login em sua conta
            </Text>
          </View>
          <View className="gap-4">
            <View className="gap-2">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Input
                    id="email"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder="matricula@portovelho.ro.gov.br"
                    label="Email"
                    autoComplete='email'
                    ref={ref}
                    error={errors.email && errors.email.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Input
                    id="password"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder="********"
                    label="Senha"
                    inputClasses='items-center'
                    autoComplete='password'
                    ref={ref}
                    secureTextEntry={!showPassword}
                    error={errors.password && errors.password.message}
                  >
                    <Icon
                      onPress={toggleShowPassword}
                      name={showPassword ? 'visibility' : 'visibility-off'}
                      size={20}
                      className='px-2'
                      // color={'black'}
                    />
                  </Input>
                )}
              />
            </View>
            <Button
              onPress={handleSubmit(onSignIn)}
              label='Entrar'
              isloading={isLoad}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
