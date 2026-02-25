/**
 * this component is comes from react-native-reanimated-carousel v4, but as that provided some problems it is currently copied and adjusted here
 * solved problems:
 *  - accessibility in dutch was impossible
 *  - the progress value was read during render which caused a lot of warnings
 */

import {StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native'
import {Pressable} from 'react-native-gesture-handler'

import type {SharedValue} from 'react-native-reanimated'
import {
  type DotStyle,
  PaginationItem,
} from '@/components/ui/carousel/pagination/PaginationItem'

export interface BasicProps<T extends object = object> {
  activeDotStyle?: DotStyle
  containerStyle?: StyleProp<ViewStyle>
  currentIndex: number
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
            accessibilityRole="button"
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
