import {Carousel} from '@/components/ui/carousel/Carousel'
import {Box} from '@/components/ui/containers/Box'
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

  return (
    <Box
      insetBottom={isPortrait ? 'md' : 'xl'}
      shrink={1}>
      <Carousel
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
    </Box>
  )
}
