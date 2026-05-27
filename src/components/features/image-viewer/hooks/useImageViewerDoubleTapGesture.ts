import {useRef} from 'react'
import {Platform} from 'react-native'
import {Gesture} from 'react-native-gesture-handler'
import {withTiming} from 'react-native-reanimated'
import type {
  ImageViewerSharedValues,
  ZoomLevel,
} from '@/components/features/image-viewer/hooks/useImageViewerGestures'

const MAX_TAP_DELAY = 200

export const useImageViewerDoubleTapGesture = (
  sharedValues: ImageViewerSharedValues,
  zoomLevel: ZoomLevel,
  clampPosition: (x: number, y: number) => void,
  imageDimensions: {height: number; width: number},
) => {
  const lastTap = useRef(0)
  const {positionX, positionY, savedScale, scale} = sharedValues

  return Gesture.Tap()
    .numberOfTaps(Platform.OS === 'ios' ? 1 : 2) // numberOfTaps does nog seem to work correctly on react-native-gesture-handler 2.31.2 (iOS)
    .maxDelay(MAX_TAP_DELAY)
    .onStart(e => {
      if (Platform.OS === 'ios') {
        // Mock double tap for iOS due to bug described above
        const now = performance.now()

        if (now - lastTap.current > MAX_TAP_DELAY) {
          lastTap.current = now

          return
        }
      }

      if (scale.value > 1) {
        scale.value = withTiming(zoomLevel.min)
        savedScale.value = zoomLevel.min
        clampPosition(0, 0)
      } else {
        scale.value = withTiming(zoomLevel.tap)
        const scaleRatio = zoomLevel.tap / scale.value

        const focalX = e.x - imageDimensions.width / 2
        const focalY = e.y - imageDimensions.height / 2

        const newX = focalX - (focalX - positionX.value) * scaleRatio
        const newY = focalY - (focalY - positionY.value) * scaleRatio

        positionX.value = withTiming(newX)
        positionY.value = withTiming(newY, undefined, () =>
          clampPosition(newX, newY),
        )

        savedScale.value = zoomLevel.tap
      }

      lastTap.current = 0
    })
}
