import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import { Camera } from 'react-native-vision-camera'
import { Icon } from '@/components/icon'
import { useClickAnimation } from '@/hooks/useClickAnimation'
import { useGallery } from '@/hooks/useGallery'
import { useCamera } from '@/hooks/useCamera'
import { useModalCamera } from '@/hooks/useModalCamera'
import {
  AnimationClick,
  CloseCamera,
  ButtonCamera,
  ModalDiscarteImage,
  GaleryImage,
  ImageScreen
} from '@/components/my-camera'

export default function CameraDevice() {
  const { id } = useLocalSearchParams()
  const {
    fps,
    device,
    format,
    isActive,
    cameraRef,
    permission,
    imageSource,
    takePhoto,
    selectImage,
    toggleCameraPosition
  } = useCamera()
  const { modalImageGalery, toggleModalImageGalery } = useGallery()
  const { focus, gesture } = useClickAnimation()
  const {
    toggleBack,
    toggleModalDiscarteImage,
    toggleModalImageSource,
    togleDiscartImage,
    imageSourceSelected,
    modalImageSource,
    modalDiscarteImage
  } = useModalCamera()

  if (!permission) return <View />

  if (!device) return <View />

  return (
    <View className="flex-1 rounded-full bg-white">
      <AnimationClick focus={focus} />
      <CloseCamera
        onClose={
          (imageSource.length > 0 && toggleModalDiscarteImage) || toggleBack
        }
      />
      <GestureDetector gesture={gesture}>
        <Camera
          fps={fps}
          ref={cameraRef}
          device={device}
          format={format}
          isActive={isActive}
          videoHdr={format && format.supportsVideoHdr}
          photoHdr={format && format.supportsPhotoHdr}
          zoom={device.neutralZoom}
          style={StyleSheet.absoluteFill}
          photo
          outputOrientation={'portrait'}
          enableZoomGesture
          // resizeMode="cover"
          // androidPreviewViewType="texture-view"
        />
      </GestureDetector>

      <ButtonCamera
        onPress={toggleModalImageGalery}
        variant={'left'}
        size={'sm'}
      >
        {imageSource.length === 0 && (
          <Icon name="camera" color="white" size={32} />
        )}
        {imageSource.length > 0 && (
          <Image
            className="h-full w-full rounded-full"
            source={imageSource[imageSource.length - 1]}
          />
        )}
      </ButtonCamera>

      <ButtonCamera onPress={takePhoto}>
        <View className="h-[4rem] w-[4rem] rounded-full bg-white" />
      </ButtonCamera>

      <ButtonCamera onPress={toggleCameraPosition} variant={'right'}>
        <Icon name="flip-camera-android" color="white" size={32} />
      </ButtonCamera>

      <ModalDiscarteImage
        imageSource={imageSource}
        modalDiscarteImage={modalDiscarteImage}
        toggleModalDiscarteImage={toggleModalDiscarteImage}
        togleDiscartImage={togleDiscartImage}
      />

      <GaleryImage
        id={id as string}
        selectImage={selectImage} 
        visible={modalImageGalery}
        imageSource={imageSource}
        onRequestClose={toggleModalImageGalery}
        toggleModalImageSource={toggleModalImageSource}
      />

      <ImageScreen
        imageSourceSelected={imageSourceSelected.uri}
        visible={modalImageSource}
        onRequestClose={() => toggleModalImageSource()}
      />
    </View>
  )
}
