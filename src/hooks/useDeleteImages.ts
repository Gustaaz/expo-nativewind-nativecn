import { useToast } from '@/components/ui'
import { database } from '@/database'
import { Image64Model } from '@/database/model'
import { getImages64 } from '@/functions/watermelondb/get-images64'
import { Q } from '@nozbe/watermelondb'
import { useState } from 'react'

interface ImageSelected {
  base64: string
}

type UseDeleteImagesProps = {
  id: string
  setImagesSources: (images: Image64Model[]) => void
  imagesSources: Image64Model[]

}

export const useDeleteImages = ({ id, setImagesSources, imagesSources }: UseDeleteImagesProps) => {
  const [selectedImageURI, setSelectedImageURI] = useState('')
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [selectedImages, setSelectedImages] = useState<ImageSelected[]>([])
  const { toast } = useToast()

  const toggleImageSelection = (image: Image64Model) => {
    setSelectedImages((prevSelectedImages) => {
      const imageExists = prevSelectedImages.find(
        (selectedImage) => selectedImage.base64 === image.base64
      )

      if (imageExists) {
        return prevSelectedImages.filter(
          (selectedImage) => selectedImage.base64 !== image.base64
        )
      }

      return [...prevSelectedImages, { base64: image.base64 }]
    })
  }

  const handleImagePress = (image: Image64Model) => {
    setSelectedImageURI(`data:image/png;base64,${image.base64}`)
    setImageModalVisible(true)
  }

  function toogleSelectAll() {
    if (selectedImages.length === imagesSources.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(imagesSources)
    }
  }

  const deleteImagesSelected = async () => {
    try {
      await database.write(async () => {
        const imagesToDelete = await database
          .get<Image64Model>('image64')
          .query(
            Q.where(
              'image64',
              Q.oneOf(selectedImages.map((image) => image.base64))
            )
          )
          .fetch()

        await Promise.all(
          imagesToDelete.map((image) => image.destroyPermanently())
        )
      })

      const images64 = await getImages64(id as string)

      setImagesSources(images64)

      toast('Imagens removidas com sucesso', 'success', 3000)

      setSelectedImages([])
    } catch (error) {
      console.log(error)
      toast('Algo deu errado, tente novamente mais tarde', 'destructive', 3000)
    }
  }

  function onRequestClose () {
    setImageModalVisible(false)
  }

  return {
    toggleImageSelection,
    handleImagePress,
    toogleSelectAll,
    onRequestClose,
    selectedImageURI,
    imageModalVisible,
    selectedImages,
    deleteImagesSelected
  }
}
