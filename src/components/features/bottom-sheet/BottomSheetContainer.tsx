import {StyleSheet} from 'react-native'
import Animated, {
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated'
import type {TestProps} from '@/components/ui/types'
import type {Theme} from '@/themes/themes'
import type {ReactNode} from 'react'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  setSheetHeight: (height: number) => void
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

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }))

  return (
    <Animated.View
      onLayout={event => {
        const measuredHeight = event.nativeEvent.layout.height

        if (measuredHeight > 0) {
          setSheetHeight(measuredHeight)
        }
      }}
      style={[
        styles.sheetContainer,
        {
          maxHeight: windowHeight - topOffset,
        },
        sheetAnimatedStyle,
      ]}
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
