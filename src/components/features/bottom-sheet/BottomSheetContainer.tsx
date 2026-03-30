import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useRef,
} from 'react'
import {StyleSheet} from 'react-native'
import {useKeyboardHandler} from 'react-native-keyboard-controller'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated'
import type {TestProps} from '@/components/ui/types'
import type {Theme} from '@/themes/themes'
import {LAYOUT_DEBOUNCE_DURATION_MS} from '@/components/features/bottom-sheet/constants'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  setSheetHeight: Dispatch<SetStateAction<number>>
  topOffset: number
  translateY: SharedValue<number>
  windowHeight: number
} & TestProps

export const BottomSheetContainer = ({
  children,
  setSheetHeight,
  translateY,
  windowHeight,
  topOffset,
  testID,
}: Props) => {
  const styles = useThemable(createStyles)
  const keyboardHeight = useSharedValue(0)
  const layoutDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )
  const hasCommittedLayoutRef = useRef(false)

  useEffect(
    () => () => {
      if (layoutDebounceRef.current !== undefined) {
        clearTimeout(layoutDebounceRef.current)
      }
    },
    [],
  )

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

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    bottom: keyboardHeight.value,
    maxHeight: windowHeight - topOffset - keyboardHeight.value,
    transform: [{translateY: translateY.value}],
  }))

  return (
    <Animated.View
      onLayout={event => {
        const height = event.nativeEvent.layout.height

        if (height <= 0) {
          return
        }

        const apply = () => {
          setSheetHeight(prev => Math.max(prev, height))
        }

        if (!hasCommittedLayoutRef.current) {
          hasCommittedLayoutRef.current = true
          apply()

          return
        }

        if (layoutDebounceRef.current !== undefined) {
          clearTimeout(layoutDebounceRef.current)
        }

        layoutDebounceRef.current = setTimeout(() => {
          layoutDebounceRef.current = undefined
          apply()
        }, LAYOUT_DEBOUNCE_DURATION_MS)
      }}
      style={[styles.sheetContainer, sheetAnimatedStyle]}
      testID={testID}>
      {children}
    </Animated.View>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    sheetContainer: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      // iOS
      shadowColor: color.bottomSheet.shadow,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16,
      // Android
      elevation: 24,
    },
  })
