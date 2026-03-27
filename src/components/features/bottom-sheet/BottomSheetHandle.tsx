import {StyleSheet, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {
  useSharedValue,
  withTiming,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated'
import type {Theme} from '@/themes/themes'
import {
  ANDROID_TIMING_CONFIG,
  IOS_SPRING_CONFIG,
} from '@/components/features/bottom-sheet/constants'
import {useThemable} from '@/themes/useThemable'

type Props = {
  closedOffset: number
  isAndroid: boolean
  isVisible: boolean
  onClose: () => void
  sheetHeight: number
  translateY: SharedValue<number>
}

export const BottomSheetHandle = ({
  closedOffset,
  isAndroid,
  isVisible,
  onClose,
  sheetHeight,
  translateY,
}: Props) => {
  const styles = useThemable(createStyles)
  const gestureStartY = useSharedValue(0)

  const panGesture = Gesture.Pan()
    .enabled(isVisible)
    .runOnJS(true)
    .onBegin(() => {
      gestureStartY.value = translateY.value
    })
    .onUpdate(event => {
      const nextY = Math.max(0, gestureStartY.value + event.translationY)

      translateY.value = Math.min(nextY, closedOffset)
    })
    .onEnd(event => {
      const shouldClose =
        event.velocityY > 900 ||
        translateY.value > Math.max(120, sheetHeight * 0.35)

      if (shouldClose) {
        onClose()
      } else {
        translateY.value = isAndroid
          ? withTiming(0, ANDROID_TIMING_CONFIG)
          : withSpring(0, {
              ...IOS_SPRING_CONFIG,
              velocity: event.velocityY,
            })
      }
    })

  return (
    <GestureDetector gesture={panGesture}>
      <View
        accessibilityHint="Veeg omlaag om te sluiten"
        accessibilityLabel="Sluiten"
        accessible
        style={styles.handleContainer}>
        <View style={styles.handleIndicator} />
      </View>
    </GestureDetector>
  )
}

const HANDLE_INDICATOR = {
  WIDTH: 48,
  HEIGHT: 4,
}

const createStyles = ({border, color, size}: Theme) =>
  StyleSheet.create({
    handleContainer: {
      alignItems: 'center',
      paddingVertical: size.spacing.md,
    },
    handleIndicator: {
      backgroundColor: color.bottomSheet.handleIndicator,
      borderRadius: border.radius.sm,
      height: HANDLE_INDICATOR.HEIGHT,
      width: HANDLE_INDICATOR.WIDTH,
    },
  })
