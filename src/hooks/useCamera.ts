import { useState, useRef, useEffect } from 'react'
import { useAppState } from '@react-native-community/hooks'
import { useIsFocused } from '@react-navigation/native'
import {
  useCameraPermission,
  useCameraDevice,
  useCameraFormat,
  Templates,
  Camera,
  CameraPosition
} from 'react-native-vision-camera'
import { ImageSource } from '@/types/imageSource'

export function useCamera() {
  const [permission, setPermission] = useState<null | boolean>(null)
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back')
  const [imageSource, setImageSource] = useState<ImageSource[]>([])
  const { requestPermission } = useCameraPermission()
  const device = useCameraDevice(cameraPosition)
  const format = useCameraFormat(device, Templates.Snapchat)
  const isFocused = useIsFocused()
  const appState = useAppState()

  const isActive = isFocused && appState === 'active'
  const fps = format && (format.maxFps >= 240 ? 240 : format.maxFps)

  const cameraRef = useRef<Camera>(null)

  useEffect(() => {
    const getPermission = async () => {
      const status = await requestPermission()

      if (status) {
        setPermission(status)
      }
    }

    getPermission()
  }, [])

  function toggleCameraPosition() {
    setCameraPosition(cameraPosition === 'back' ? 'front' : 'back')
  }

  const takePhoto = async () => {
    if (!cameraRef.current || !device) return
    const photo = await cameraRef.current.takePhoto()
    const objectImage = {
      uri: `file://${photo.path}`
    }

    setImageSource((rest) => [...rest, { ...objectImage, selected: true }])

    // const result = await fetch(`file://${photo.path}`)
    // setModalIsVisible(true)
    // const data = await result.blob()
  }

  function selectImage(image: ImageSource) {
    setImageSource((rest) => {
      return rest.map((item) => {
        if (item.uri === image.uri) {
          return { ...item, selected: !item.selected }
        }
        return item
      })
    })
  }

  return {
    permission,
    device,
    format,
    isActive,
    fps,
    cameraRef,
    imageSource,
    takePhoto,
    selectImage,
    toggleCameraPosition
  }
}
