import {StyleSheet, View} from 'react-native'
import type {CityPassPass} from '@/modules/city-pass/types'
import type {CarouselRenderItemInfo} from 'react-native-reanimated-carousel/lib/typescript/types'
import {Carousel} from '@/components/ui/carousel/Carousel'
import {Basic} from '@/components/ui/carousel/pagination/PaginationBasic'
import {useSelector} from '@/hooks/redux/useSelector'
import {useCarousel} from '@/hooks/useCarousel'
import {CityPass} from '@/modules/city-pass/components/card-display/CityPass'
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

export const CityPassesSwiper = () => {
  const styles = useThemable(createStyles)
  const cityPasses = useGetSecureCityPasses()
  const startIndex = useSelector(selectStartIndex)
  const {
    onPressPagination,
    progress,
    ref,
    currentIndex,
    onProgressChange,
    width,
  } = useCarousel()

  const passWidth = getPassWidth(width)

  return (
    <View style={styles.container}>
      <Carousel<CityPassPass>
        data={cityPasses}
        defaultIndex={startIndex}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: getParallaxScrollingOffset(
            width,
            passWidth,
            NEXT_CARD_VISIBLE_FRACTION_OF_AVAILABLE_SPACE,
          ),
          parallaxAdjacentItemScale: 1,
        }}
        onProgressChange={onProgressChange}
        ref={ref}
        renderItem={({item, index}: CarouselRenderItemInfo<CityPassPass>) => (
          <CityPass
            cityPass={item}
            index={index}
            isCurrentIndex={currentIndex === index}
            itemCount={cityPasses.length}
          />
        )}
        width={width}
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
          testID="CityPassCarouselPagination"
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
