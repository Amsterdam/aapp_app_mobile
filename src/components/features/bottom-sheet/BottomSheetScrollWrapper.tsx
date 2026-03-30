import {StyleSheet} from 'react-native'
import {useKeyboardHandler} from 'react-native-keyboard-controller'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import type {ReactNode} from 'react'
import {HANDLE_HEIGHT} from '@/components/features/bottom-sheet/constants'

type Props = {
  children: ReactNode
  topOffset: number
  windowHeight: number
}

export const BottomSheetScrollWrapper = ({
  children,
  topOffset,
  windowHeight,
}: Props) => {
  const styles = createStyles()
  const keyboardHeight = useSharedValue(0)

  useKeyboardHandler(
    {
      onMove: e => {
        'worklet'
        keyboardHeight.value = e.height
      },
      onEnd: e => {
        'worklet'
        keyboardHeight.value = e.height
      },
    },
    [],
  )

  const constraintStyle = useAnimatedStyle(() => ({
    maxHeight: windowHeight - topOffset - keyboardHeight.value - HANDLE_HEIGHT,
  }))

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      scrollIndicatorInsets={{right: Number.MIN_VALUE}}
      style={[styles.scroll, constraintStyle]}>
      {children}
    </Animated.ScrollView>
  )
}

const createStyles = () =>
  StyleSheet.create({
    contentContainer: {
      flexGrow: 0,
    },
    scroll: {
      flex: 1,
      flexShrink: 1,
      minHeight: 0,
    },
  })
