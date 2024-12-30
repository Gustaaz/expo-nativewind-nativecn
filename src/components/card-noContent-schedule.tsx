import { Text, View } from 'react-native'
import { Icon } from './icon'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui'

export function CardNoContentSchedule() {
  return (
    <Card className="w-full bg-[#FFFFFF] p-6 dark:bg-[#09090B]">
      <CardHeader>
        <View className="flex-row items-center">
          <Icon name="calendar-month" size={24} />
          <CardTitle> Sem agendamentos</CardTitle>
        </View>
        <CardDescription>
          Nenhum agendamento encontrado no dispositivo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-base text-primary">
          Agende as vistorias no e-Vista-Sede e sincronize com o seu dispositivo
        </Text>
      </CardContent>
    </Card>
  )
}
