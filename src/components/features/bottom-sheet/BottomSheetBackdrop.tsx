// eslint-disable-next-line no-restricted-imports
import {Pressable, StyleSheet} from 'react-native'
import Animated, {
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  closedOffset: number
  onClose: () => void
  sheetHeight: number
  translateY: SharedValue<number>
}

export const BottomSheetBackdrop = ({
  closedOffset,
  sheetHeight,
  translateY,
  onClose,
}: Props) => {
  const styles = useThemable(createStyles(sheetHeight))

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    const progress = Math.max(
      0,
      1 - translateY.value / Math.max(closedOffset, 1),
    )

    return {
      opacity: progress,
    }
  })

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.backdropContainer, backdropAnimatedStyle]}>
      <Pressable
        accessibilityHint="Dubbeltik om te sluiten"
        accessibilityLabel="Sluiten"
        accessibilityRole="button"
        onPress={onClose}
        style={styles.button}
      />
    </Animated.View>
  )
}

const createStyles =
  (sheetHeight: number) =>
  ({color}: Theme) =>
    StyleSheet.create({
      backdropContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: color.bottomSheet.overlay,
      },
      button: {
        flex: 1,
        marginBottom: sheetHeight - 20,
      },
    })
