import {Gesture} from 'react-native-gesture-handler'
import type {ImageViewerSharedValues} from '@/components/features/image-viewer/hooks/useImageViewerGestures'

const MIN_DRAG_DISTANCE = 20

export const useImageViewerDragGesture = (
  sharedValues: ImageViewerSharedValues,
  clampPosition: (x: number, y: number) => void,
) => {
  const {positionX, positionY, savedPosition, scale} = sharedValues

  return Gesture.Pan()
    .minDistance(MIN_DRAG_DISTANCE)
    .onUpdate(e => {
      positionX.value = savedPosition.value.x + e.translationX
      positionY.value = savedPosition.value.y + e.translationY
    })
    .onEnd(e => {
      if (scale.value <= 1) {
        clampPosition(0, 0)
      } else {
        clampPosition(
          savedPosition.value.x + e.translationX,
          savedPosition.value.y + e.translationY,
        )
      }
    })
}
