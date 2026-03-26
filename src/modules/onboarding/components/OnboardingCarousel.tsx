import {StyleSheet} from 'react-native'
import {Carousel} from '@/components/ui/carousel/Carousel'
import {Column} from '@/components/ui/layout/Column'
import {useCarousel} from '@/hooks/useCarousel'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useModules} from '@/hooks/useModules'
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

  const {enabledModulesBySlug} = useModules()

  const filteredOnboardingData = onboardingData.filter(item => {
    if (!item.requiresEnabledModule) {
      return true
    }

    return enabledModulesBySlug?.includes(item.requiresEnabledModule)
  })

  return (
    <Column
      flex={1}
      gutter="md">
      <Carousel
        data={filteredOnboardingData}
        onProgressChange={onProgressChange}
        ref={ref}
        renderItem={({item, index}) => (
          <CarouselRenderItem
            isLastItem={index + 1 === filteredOnboardingData.length}
            isPortrait={isPortrait}
            item={item}
            onPressNextButton={() => onPressPagination(index + 1)}
          />
        )}
        style={styles.container}
        width={width}
      />
      <OnboardingCarouselPagination
        currentIndex={currentIndex}
        data={filteredOnboardingData}
        onPress={onPressPagination}
        progress={progress}
      />
    </Column>
  )
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },
})
