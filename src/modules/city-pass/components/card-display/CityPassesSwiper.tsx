import {useRef, useState} from 'react'
import {StyleSheet, useWindowDimensions, View} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel'
import type {CityPassPass} from '@/modules/city-pass/types'
import {useSelector} from '@/hooks/redux/useSelector'
import {CityPass} from '@/modules/city-pass/components/card-display/CityPass'
import {Basic} from '@/modules/city-pass/components/pagination/PaginationBasic'
import {
  CITY_PASS_HEIGHT,
  NEXT_CARD_VISIBLE_FRACTION_OF_AVAILABLE_SPACE,
} from '@/modules/city-pass/constants'
import {useGetSecureCityPasses} from '@/modules/city-pass/hooks/useGetSecureCityPasses'
import {selectStartIndex} from '@/modules/city-pass/slice'
import {getParallaxScrollingOffset} from '@/modules/city-pass/utils/getParallaxScrollingOffset'
import {getPassWidth} from '@/modules/city-pass/utils/getPassWidth'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const PAGINATION_HEIGHT = 50

type CarouselItem = {
  index: number
  item: CityPassPass
}

export const CityPassesSwiper = () => {
  const initialPage = 0
  const styles = useThemable(createStyles)
  const cityPasses = useGetSecureCityPasses()
  const {width: windowWidth} = useWindowDimensions()
  const ref = useRef<ICarouselInstance>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(initialPage)
  const startIndex = useSelector(selectStartIndex)

  const progress = useSharedValue<number>(initialPage)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    })
  }

  const passWidth = getPassWidth(windowWidth)

  return (
    <View style={styles.container}>
      <Carousel
        data={cityPasses}
        defaultIndex={startIndex}
        loop={false}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: getParallaxScrollingOffset(
            windowWidth,
            passWidth,
            NEXT_CARD_VISIBLE_FRACTION_OF_AVAILABLE_SPACE,
          ),
          parallaxAdjacentItemScale: 1,
        }}
        onConfigurePanGesture={gesture => {
          'worklet'
          gesture.activeOffsetX([-10, 10])
        }}
        onProgressChange={(_, absoluteProgress) => {
          setCurrentIndex(Math.round(absoluteProgress))
          progress.value = absoluteProgress < 0 ? 0 : absoluteProgress
        }}
        pagingEnabled
        ref={ref}
        renderItem={({item, index}: CarouselItem) => (
          <CityPass
            cityPass={item}
            index={index}
            isCurrentIndex={currentIndex === index}
            itemCount={cityPasses.length}
          />
        )}
        snapEnabled
        style={{
          width: windowWidth,
        }}
        vertical={false}
        width={windowWidth}
      />
      <View style={styles.paginationContainer}>
        <Basic
          activeDotStyle={styles.paginationItemActive}
          containerStyle={styles.pagination}
          currentIndex={currentIndex}
          data={cityPasses}
          dotStyle={styles.paginationItem}
          onPress={onPressPagination}
          progress={progress}
        />
      </View>
    </View>
  )
}

const createStyles = ({color, size, border}: Theme) =>
  StyleSheet.create({
    container: {
      flexBasis: CITY_PASS_HEIGHT + PAGINATION_HEIGHT,
      flexShrink: 1,
    },
    paginationContainer: {
      height: PAGINATION_HEIGHT,
      justifyContent: 'flex-end',
    },
    pagination: {
      borderRadius: 25,
      backgroundColor: color.pagination.onDark.container.background,
      alignItems: 'center',
      paddingHorizontal: size.spacing.sm,
      paddingVertical: 12,
    },
    paginationItem: {
      width: size.spacing.sm,
      height: size.spacing.sm,
      marginHorizontal: size.spacing.xs,
      backgroundColor: color.pagination.onDark.item.inactive,
      borderRadius: border.radius.sm,
    },
    paginationItemActive: {
      backgroundColor: color.pagination.onDark.item.active,
    },
  })
