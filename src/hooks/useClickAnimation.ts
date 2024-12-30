import { Focus } from '@/types/focus'
import { useState, useCallback } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { Point } from 'react-native-vision-camera'


export function useClickAnimation() {
  const [focus, setFocus] = useState<Focus>({} as Focus)

  const focusOnPoint = useCallback(
    (targetPoint: Point) => {
      const tagetCoordinateX = targetPoint.x - 25
      const tagetCoordinateY = targetPoint.y - 20

      setFocus({
        isActive: true,
        x: tagetCoordinateX,
        y: tagetCoordinateY
      })

    //   const camera = cameraRef.current
    //   if (!camera) {
    //     setFocus({ isActive: false })
    //     return
    //   }

      setTimeout(() => setFocus({ isActive: false }), 800)
    },
    []
  )
  const gesture = Gesture.Tap().onEnd(({ x, y }) => {
    runOnJS(focusOnPoint)({ x, y })
  })

  return { focus, gesture }
}
