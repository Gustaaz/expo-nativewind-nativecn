import { useState } from "react"

export function  useGallery() {
  const [modalImageGalery, setModalImageGalery] = useState(false)
  function toggleModalImageGalery() {
    setModalImageGalery(!modalImageGalery)
  }

  return {
    modalImageGalery,
    toggleModalImageGalery
  }
}