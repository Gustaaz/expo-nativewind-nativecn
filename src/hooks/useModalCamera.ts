import { ImageSource } from '@/types/imageSource'
import { router } from 'expo-router'
import { useState } from 'react'

export function useModalCamera() {
  const [imageSourceSelected, setImageSourceSelected] = useState<ImageSource>(
    {} as ImageSource
  )
  const [modalDiscarteImage, setModalDiscarteImage] = useState(false)
  const [modalImageSource, setModalImageSource] = useState(false)
  function toggleModalDiscarteImage() {
    setModalDiscarteImage(!modalDiscarteImage)
  }

  function togleDiscartImage() {
    setModalDiscarteImage(false)
    router.back()
  }

  function toggleModalImageSource(image?: ImageSource) {
    setModalImageSource(!modalImageSource)

    if (image) {
      return setImageSourceSelected(image)
    }

    return setImageSourceSelected({} as ImageSource)
  }

  function toggleBack() {
    router.back()
  }

  return {
    modalImageSource,
    imageSourceSelected,
    modalDiscarteImage,
    toggleModalDiscarteImage,
    togleDiscartImage,
    toggleModalImageSource,
    toggleBack
  }
}
