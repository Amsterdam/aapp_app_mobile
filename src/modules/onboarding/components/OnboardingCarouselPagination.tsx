import {StyleSheet, View} from 'react-native'
import {type SharedValue} from 'react-native-reanimated'
import type {Theme} from '@/themes/themes'
import {Basic} from '@/components/ui/carousel/pagination/PaginationBasic'
import {useThemable} from '@/themes/useThemable'

type Props<T extends Record<string, unknown>> = {
  currentIndex: number
  data: T[]
  onPress: (index: number) => void
  progress: SharedValue<number>
}

export const OnboardingCarouselPagination = <
  T extends Record<string, unknown>,
>({
  data,
  onPress,
  progress,
  currentIndex,
}: Props<T>) => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.paginationContainer}>
      <Basic
        activeDotStyle={styles.paginationItemActive}
        containerStyle={styles.pagination}
        currentIndex={currentIndex}
        data={data}
        dotStyle={styles.paginationItem}
        onPress={onPress}
        progress={progress}
      />
    </View>
  )
}

const PAGINATION_HEIGHT = 50

const createStyles = ({color, size, border}: Theme) =>
  StyleSheet.create({
    paginationContainer: {
      height: PAGINATION_HEIGHT,
    },
    pagination: {
      borderRadius: 25,
      backgroundColor: color.pagination.onLight.container.background,
      alignItems: 'center',
      paddingHorizontal: size.spacing.sm,
      paddingVertical: 12,
    },
    paginationItem: {
      width: size.spacing.sm,
      height: size.spacing.sm,
      marginHorizontal: size.spacing.xs,
      backgroundColor: color.pagination.onLight.item.inactive,
      borderRadius: border.radius.sm,
    },
    paginationItemActive: {
      backgroundColor: color.pagination.onLight.item.active,
    },
  })
