/**
 * TODO: remove this file once we have upgraded to react-native-reanimated-carousel v4
 * this component is comes from react-native-reanimated-carousel v4,but as that provided some other problems it is currently copied here
 */

import React from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import type {PropsWithChildren} from 'react'
import type {ViewProps, ViewStyle} from 'react-native'

export type DotStyle = Omit<ViewStyle, 'width' | 'height'> & {
  height?: number
  width?: number
}

export const PaginationItem: React.FC<
  PropsWithChildren<{
    activeDotStyle?: DotStyle
    animValue: SharedValue<number>
    count: number
    dotStyle?: DotStyle
    horizontal?: boolean
    index: number
    size?: number
  }> &
    ViewProps
> = props => {
  const {
    animValue,
    dotStyle,
    activeDotStyle,
    index,
    count,
    size,
    horizontal,
    children,
    ...viewProps
  } = props

  const defaultDotSize = 10

  const sizes = {
    width: size || dotStyle?.width || defaultDotSize,
    height: size || dotStyle?.height || defaultDotSize,
  }

  const {width} = sizes
  const {height} = sizes

  const animStyle = useAnimatedStyle(() => {
    const animatedSize = horizontal ? height : width
    const inputRange = [index - 1, index, index + 1]
    const outputRange = [-animatedSize, 0, animatedSize]

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolation.CLAMP,
          ),
        },
      ],
    }
  }, [animValue, index, count, horizontal])

  return (
    <View
      {...viewProps}
      style={[{width, height}, styles.dot, dotStyle]}>
      <Animated.View style={[styles.activeDot, animStyle, activeDotStyle]}>
        {children}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    overflow: 'hidden',
  },
  activeDot: {
    backgroundColor: 'black',
    flex: 1,
  },
})
