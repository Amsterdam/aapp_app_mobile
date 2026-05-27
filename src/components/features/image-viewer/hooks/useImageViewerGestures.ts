import {useMemo} from 'react'
import {Gesture} from 'react-native-gesture-handler'
import {
  clamp,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  type DerivedValue,
  type SharedValue,
} from 'react-native-reanimated'
import {runOnJS} from 'react-native-worklets'
import {useImageViewerDoubleTapGesture} from '@/components/features/image-viewer/hooks/useImageViewerDoubleTapGesture'
import {useImageViewerDragGesture} from '@/components/features/image-viewer/hooks/useImageViewerDragGesture'
import {useImageViewerPinchGesture} from '@/components/features/image-viewer/hooks/useImageViewerPinchGesture'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDeviceContext} from '@/hooks/useDeviceContext'

const MIN_ZOOM_VALUE = 0.8
const MAX_ZOOM_VALUE = 5

export type ZoomLevel = {
  max: number
  min: number
  tap: number
}

export type ImageViewerSharedValues = {
  maxDragRange: DerivedValue<{x: number; y: number}>
  positionX: SharedValue<number>
  positionY: SharedValue<number>
  savedPosition: SharedValue<{x: number; y: number}>
  savedScale: SharedValue<number>
  scale: SharedValue<number>
}

export const useImageViewerGestures = (initialLayout: {
  height: number
  width: number
}) => {
  const {width, height} = useDeviceContext()
  const {goBack} = useNavigation()

  const scale = useSharedValue(MIN_ZOOM_VALUE)
  const savedScale = useSharedValue(MIN_ZOOM_VALUE)
  const positionX = useSharedValue(0)
  const positionY = useSharedValue(0)
  const savedPosition = useSharedValue({x: 0, y: 0})

  const maxDragRange = useDerivedValue(
    () => ({
      x: Math.max(0, initialLayout.width * scale.value - width) / 2,
      y: Math.max(0, initialLayout.height * scale.value - height) / 2,
    }),
    [initialLayout, width, height],
  )

  const derivedLayout = useDerivedValue(
    () => ({
      imageWidth: initialLayout.width * scale.value,
      imageHeight: initialLayout.height * scale.value,
      screenEmptyWidth: Math.max(0, width - initialLayout.width * scale.value),
      screenEmptyHeight: Math.max(
        0,
        height - initialLayout.height * scale.value,
      ),
    }),
    [initialLayout, width, height],
  )

  const zoomLevel: ZoomLevel = useMemo(() => {
    const tapZoomlevel =
      Math.max(height, width) /
      Math.min(initialLayout.height, initialLayout.width)

    return {
      min: MIN_ZOOM_VALUE,
      max: Math.max(tapZoomlevel, MAX_ZOOM_VALUE),
      tap: tapZoomlevel,
    }
  }, [height, width, initialLayout])

  const clampPosition = (x: number, y: number) => {
    'worklet'

    const clampedX = clamp(x, -maxDragRange.value.x, maxDragRange.value.x)
    const clampedY = clamp(y, -maxDragRange.value.y, maxDragRange.value.y)

    positionX.value = withTiming(clampedX)
    positionY.value = withTiming(clampedY)

    savedPosition.value = {x: clampedX, y: clampedY}
  }

  const isGestureOnBackground = (x: number, y: number) => {
    'worklet'

    const isAbove = y < derivedLayout.value.screenEmptyHeight / 2
    const isBelow = y > height - derivedLayout.value.screenEmptyHeight / 2
    const isLeft = x < derivedLayout.value.screenEmptyWidth / 2
    const isRight = x > width - derivedLayout.value.screenEmptyWidth / 2

    return isAbove || isBelow || isLeft || isRight
  }

  const pinchGesture = useImageViewerPinchGesture(
    {
      maxDragRange,
      positionX,
      positionY,
      savedPosition,
      savedScale,
      scale,
    },
    zoomLevel,
  )

  const dragGesture = useImageViewerDragGesture(
    {
      maxDragRange,
      positionX,
      positionY,
      savedPosition,
      savedScale,
      scale,
    },
    clampPosition,
  )

  const doubleTapGesture = useImageViewerDoubleTapGesture(
    {
      maxDragRange,
      positionX,
      positionY,
      savedPosition,
      savedScale,
      scale,
    },
    zoomLevel,
    clampPosition,
  )

  const dismissImageViewer = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(e => {
      if (isGestureOnBackground(e.absoluteX, e.absoluteY)) {
        runOnJS(goBack)()
      }
    })

  const gestures = Gesture.Race(
    Gesture.Simultaneous(doubleTapGesture, dismissImageViewer),
    dragGesture,
    pinchGesture,
  )

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: positionX.value},
      {translateY: positionY.value},
      {scale: scale.value},
    ],
  }))

  return {gestures, animatedStyle}
}
