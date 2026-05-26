import {Platform} from 'react-native'
import {Gesture} from 'react-native-gesture-handler'
import {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {useDeviceContext} from '@/hooks/useDeviceContext'

const MIN_ZOOM_VALUE = 0.8
const MAX_ZOOM_VALUE = 3
const MAX_DRAG_FACTOR = 0.8
const MAX_TAP_DELAY = 200

export const useImageViewerGestures = () => {
  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)
  const {width, height} = useDeviceContext()

  const positionX = useSharedValue(0)
  const positionY = useSharedValue(0)
  const savedPosition = useSharedValue({x: 0, y: 0})

  const pinchGesture = Gesture.Pinch()
    .hitSlop(20)
    .onUpdate(e => {
      scale.value = clamp(
        savedScale.value * e.scale,
        MIN_ZOOM_VALUE,
        MAX_ZOOM_VALUE,
      )
    })

    .onEnd(() => {
      savedScale.value = scale.value
      positionX.value = withTiming(0)
      positionY.value = withTiming(0)
      savedPosition.value = {x: 0, y: 0}
    })

  const dragGesture = Gesture.Pan()
    .hitSlop(20)
    .minDistance(1)
    .onUpdate(e => {
      const maxRangeX = (width / 2) * MAX_DRAG_FACTOR * scale.value
      const maxRangeY = (height / 2) * MAX_DRAG_FACTOR * scale.value

      positionX.value = clamp(
        savedPosition.value.x + e.translationX,
        -maxRangeX,
        maxRangeX,
      )

      positionY.value = clamp(
        savedPosition.value.y + e.translationY,
        -maxRangeY,
        maxRangeY,
      )
    })
    .onEnd(() => {
      if (scale.value <= 1) {
        positionX.value = withTiming(0)
        positionY.value = withTiming(0)
        savedPosition.value = {x: 0, y: 0}
      } else {
        savedPosition.value = {x: positionX.value, y: positionY.value}
      }
    })

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(Platform.OS === 'ios' ? 1 : 2) // numberOfTaps does nog seem to work correctly on react-native-gesture-handler 2.31.2 (iOS)
    .maxDelay(MAX_TAP_DELAY)
    .onStart(() => {
      if (scale.value > 1) {
        scale.value = withTiming(MIN_ZOOM_VALUE)
        savedScale.value = MIN_ZOOM_VALUE
      } else {
        scale.value = withTiming(MAX_ZOOM_VALUE)
        savedScale.value = MAX_ZOOM_VALUE
      }

      savedPosition.value = {x: 0, y: 0}
      positionX.value = withTiming(0)
      positionY.value = withTiming(0)
    })

  const gestures = Gesture.Race(doubleTapGesture, dragGesture, pinchGesture)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: Math.max(MIN_ZOOM_VALUE, Math.min(MAX_ZOOM_VALUE, scale.value))},
      {translateX: positionX.value / scale.value},
      {translateY: positionY.value / scale.value},
    ],
  }))

  return {gestures, animatedStyle}
}
