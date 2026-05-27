import {Gesture} from 'react-native-gesture-handler'
import {clamp, useSharedValue} from 'react-native-reanimated'
import type {
  ImageViewerSharedValues,
  ZoomLevel,
} from '@/components/features/image-viewer/hooks/useImageViewerGestures'

export const useImageViewerPinchGesture = (
  sharedValues: ImageViewerSharedValues,
  zoomLevel: ZoomLevel,
  imageDimensions: {height: number; width: number},
) => {
  const {maxDragRange, positionX, positionY, savedPosition, savedScale, scale} =
    sharedValues

  const pinchStartScale = useSharedValue(zoomLevel.min)
  const pinchStartX = useSharedValue(0)
  const pinchStartY = useSharedValue(0)

  return Gesture.Pinch()
    .onStart(() => {
      pinchStartScale.value = scale.value
      pinchStartX.value = positionX.value
      pinchStartY.value = positionY.value
    })
    .onUpdate(e => {
      const nextScale = clamp(
        pinchStartScale.value * e.scale,
        zoomLevel.min,
        zoomLevel.max,
      )

      scale.value = nextScale

      /// This block adjusts the positionX and positionY if pinching results in the image moving beyond the max drag ranges ///
      const scaleRatio = nextScale / pinchStartScale.value
      const focalX = e.focalX - imageDimensions.width / 2
      const focalY = e.focalY - imageDimensions.height / 2
      const nextX = focalX - (focalX - pinchStartX.value) * scaleRatio
      const nextY = focalY - (focalY - pinchStartY.value) * scaleRatio

      positionX.value = clamp(
        nextX,
        -maxDragRange.value.x,
        maxDragRange.value.x,
      )
      positionY.value = clamp(
        nextY,
        -maxDragRange.value.y,
        maxDragRange.value.y,
      )
      /// End block ///
    })
    .onEnd(() => {
      savedScale.value = scale.value

      savedPosition.value = {
        x: positionX.value,
        y: positionY.value,
      }
    })
}
