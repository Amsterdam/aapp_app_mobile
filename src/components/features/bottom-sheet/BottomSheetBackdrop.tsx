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
  translateY: SharedValue<number>
}

export const BottomSheetBackdrop = ({
  closedOffset,
  translateY,
  onClose,
}: Props) => {
  const styles = useThemable(createStyles)

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
        onPress={onClose}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    backdropContainer: {
      ...StyleSheet.absoluteFill,
      backgroundColor: color.bottomSheet.overlay,
    },
  })
