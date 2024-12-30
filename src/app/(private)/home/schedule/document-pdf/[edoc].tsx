import { Spinner } from '@/components/spinner'
import { usePdf } from '@/hooks/usePdf'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'nativewind'
import { Dimensions, View } from 'react-native'
import Pdf from 'react-native-pdf'

export default function DocumentPDF() {
  const { edoc } = useLocalSearchParams()
  const { pdfSource } = usePdf({
    edoc: edoc as string
  })
  return (
    <View className="flex-1 items-center justify-start">
      <Pdf
        trustAllCerts={false}
        scale={1}
        minScale={0.5}
        renderActivityIndicator={() => <Spinner variant={'black'} />}
        maxScale={3}
        source={pdfSource}
        style={styles.pdf}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
