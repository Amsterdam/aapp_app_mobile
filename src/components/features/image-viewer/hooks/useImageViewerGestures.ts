import {useMemo, useRef} from 'react'
import {Platform} from 'react-native'
import {Gesture} from 'react-native-gesture-handler'
import {
  clamp,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {useDeviceContext} from '@/hooks/useDeviceContext'

const MIN_ZOOM_VALUE = 0.8
const MAX_TAP_DELAY = 200

export const useImageViewerGestures = (initialLayout: {
  height: number
  width: number
}) => {
  const {width, height} = useDeviceContext()
  const lastTap = useRef(0) // Ref that tracks double tap as a temp solution for iOS numberOfTaps not working correctly

  const scale = useSharedValue(MIN_ZOOM_VALUE)
  const savedScale = useSharedValue(MIN_ZOOM_VALUE)
  const positionX = useSharedValue(0)
  const positionY = useSharedValue(0)
  const savedPosition = useSharedValue({x: 0, y: 0})

  const maxDragRange = useDerivedValue(() => ({
    x: Math.max(0, initialLayout.width * scale.value - width) / 2,
    y: Math.max(0, initialLayout.height * scale.value - height) / 2,
  }))

  const tapZoomLevel = useMemo(
    () =>
      Math.max(height, width) /
      Math.min(initialLayout.height, initialLayout.width),
    [height, width, initialLayout],
  )

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      const nextScale = clamp(
        savedScale.value * e.scale,
        MIN_ZOOM_VALUE,
        tapZoomLevel,
      )

      /// This block adjusts the positionX and Y if pinching results in the image moving beyond the max drag ranges ///
      const scaleRatio = nextScale / savedScale.value
      const focalX = e.focalX - width / 2
      const focalY = e.focalY - height / 2
      const newX = focalX - (focalX - savedPosition.value.x) * scaleRatio
      const newY = focalY - (focalY - savedPosition.value.y) * scaleRatio

      const clampedX = clamp(newX, -maxDragRange.value.x, maxDragRange.value.x)
      const clampedY = clamp(newY, -maxDragRange.value.y, maxDragRange.value.y)

      positionX.value = withTiming(clampedX)
      positionY.value = withTiming(clampedY)
      savedPosition.value = {x: clampedX, y: clampedY}
      /// End block ///

      scale.value = nextScale
    })
    .onEnd(() => {
      savedScale.value = scale.value
    })

  const dragGesture = Gesture.Pan()
    .minDistance(20)
    .onUpdate(e => {
      positionX.value = savedPosition.value.x + e.translationX
      positionY.value = savedPosition.value.y + e.translationY
    })
    .onEnd(e => {
      if (scale.value <= 1) {
        positionX.value = withTiming(0)
        positionY.value = withTiming(0)
        savedPosition.value = {x: 0, y: 0}
      } else {
        const clampedX = clamp(
          savedPosition.value.x + e.translationX,
          -maxDragRange.value.x,
          maxDragRange.value.x,
        )
        const clampedY = clamp(
          savedPosition.value.y + e.translationY,
          -maxDragRange.value.y,
          maxDragRange.value.y,
        )

        positionX.value = withTiming(clampedX)
        positionY.value = withTiming(clampedY)
        savedPosition.value = {x: clampedX, y: clampedY}
      }
    })

  const doubleTapGesture = Gesture.Tap()
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
        scale.value = withTiming(MIN_ZOOM_VALUE)
        savedScale.value = MIN_ZOOM_VALUE

        savedPosition.value = {x: 0, y: 0}
        positionX.value = withTiming(0)
        positionY.value = withTiming(0)
      } else {
        const scaleRatio = tapZoomLevel / scale.value

        const focalX = e.x - width / 2
        const focalY = e.y - height / 2

        const clampedX = clamp(
          focalX - (focalX - positionX.value) * scaleRatio,
          -maxDragRange.value.x,
          maxDragRange.value.x,
        )

        const clampedY = clamp(
          focalY - (focalY - positionY.value) * scaleRatio,
          -maxDragRange.value.x,
          maxDragRange.value.x,
        )

        positionX.value = withTiming(clampedX)
        positionY.value = withTiming(clampedY)

        scale.value = withTiming(tapZoomLevel)
        savedScale.value = tapZoomLevel
      }

      lastTap.current = 0
    })

  const gestures = Gesture.Race(doubleTapGesture, dragGesture, pinchGesture)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: positionX.value},
      {translateY: positionY.value},
      {scale: scale.value},
    ],
  }))

  return {gestures, animatedStyle}
}
