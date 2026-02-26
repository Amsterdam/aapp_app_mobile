import {StyleSheet} from 'react-native'
import {Carousel} from '@/components/ui/carousel/Carousel'
import {Column} from '@/components/ui/layout/Column'
import {useCarousel} from '@/hooks/useCarousel'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {CarouselRenderItem} from '@/modules/onboarding/components/CarouselRenderItem'
import {OnboardingCarouselPagination} from '@/modules/onboarding/components/OnboardingCarouselPagination'
import {onboardingData} from '@/modules/onboarding/data/onboarding'

export const OnboardingCarousel = () => {
  const {isPortrait} = useDeviceContext()
  const {
    onPressPagination,
    progress,
    ref,
    currentIndex,
    onProgressChange,
    width,
  } = useCarousel()
  const styles = createStyles()

  return (
    <Column
      flex={1}
      gutter="md">
      <Carousel
        containerStyle={styles.container}
        data={onboardingData}
        onProgressChange={onProgressChange}
        ref={ref}
        renderItem={({item, index}) => (
          <CarouselRenderItem
            isLastItem={index + 1 === onboardingData.length}
            isPortrait={isPortrait}
            item={item}
            onPressNextButton={() => onPressPagination(index + 1)}
          />
        )}
        width={width}
      />
      <OnboardingCarouselPagination
        currentIndex={currentIndex}
        data={onboardingData}
        onPress={onPressPagination}
        progress={progress}
      />
    </Column>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexShrink: 1,
    },
  })
