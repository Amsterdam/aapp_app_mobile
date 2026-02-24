/**
 * TODO: remove this file once we have upgraded to react-native-reanimated-carousel v4
 * this component is comes from react-native-reanimated-carousel v4,but as that provided some other problems it is currently copied here
 */

import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Pressable} from 'react-native-gesture-handler'

import type {DotStyle} from '@/modules/city-pass/components/pagination/PaginationItem'
import type {StyleProp, ViewStyle} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import {PaginationItem} from '@/modules/city-pass/components/pagination/PaginationItem'

export interface BasicProps<T extends object = object> {
  activeDotStyle?: DotStyle
  containerStyle?: StyleProp<ViewStyle>
  currentIndex?: number
  data: Array<T>
  dotStyle?: DotStyle
  horizontal?: boolean
  onPress?: (index: number) => void
  progress: SharedValue<number>
  renderItem?: (item: T, index: number) => React.ReactNode
  size?: number
}

export const Basic = <T extends object>(props: BasicProps<T>) => {
  const {
    activeDotStyle,
    currentIndex,
    dotStyle,
    progress,
    horizontal = true,
    data,
    size,
    containerStyle,
    renderItem,
    onPress,
  } = props

  if (
    typeof size === 'string' ||
    typeof dotStyle?.width === 'string' ||
    typeof dotStyle?.height === 'string'
  ) {
    throw new Error('size/width/height must be a number')
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {data.map((item, index) => (
        <Pressable
          hitSlop={5}
          key={index}
          onPress={() => onPress?.(index)}>
          <PaginationItem
            accessibilityLabel={
              currentIndex === index
                ? `Huidige slide, ${index + 1}`
                : `Ga naar slide ${index + 1}`
            }
            activeDotStyle={activeDotStyle}
            animValue={progress}
            count={data.length}
            dotStyle={dotStyle}
            horizontal={!horizontal}
            index={index}
            size={size}>
            {renderItem?.(item, index)}
          </PaginationItem>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
  },
})
