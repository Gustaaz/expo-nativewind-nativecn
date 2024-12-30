import { useToast } from '@/components/ui'
import { database } from '@/database'
import { newImage64 } from '@/functions/watermelondb/new-image64'
import { ImageSource } from '@/types/imageSource'
import { readAsStringAsync, EncodingType } from 'expo-file-system'
import { router } from 'expo-router'

type SaveImages = {
  imageSource: ImageSource[]
  id: string
}

export function useSaveImage() {
  const { toast } = useToast()

  const saveImages = async ({ imageSource, id }: SaveImages) => {
    const imagesSelected = imageSource.filter(({ selected }) => selected)

    const imagesBase64 = await Promise.all(
      imagesSelected.map(async ({ uri }) => {
        return await readAsStringAsync(uri, {
          encoding: EncodingType.Base64
        })
      })
    )
    try {
      await database.write(async () => {
        imagesBase64.forEach((image) => {
          newImage64({ base64: image, inspectionSheetId: id })
        })
      })
      toast('Imagens salvas com sucesso', 'success', 3000)
      router.back()
    } catch (error) {
      toast('Algo deu errado, tente novamente mais tarde', 'destructive', 3000)
    }
  }

  return { saveImages }
}
