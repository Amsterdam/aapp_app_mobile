import {useRef} from 'react'
import {useWindowDimensions} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'
import {type ICarouselInstance} from 'react-native-reanimated-carousel'
import Carousel from 'react-native-reanimated-carousel'
import {Box} from '@/components/ui/containers/Box'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {CarouselRenderItem} from '@/modules/onboarding/components/CarouselRenderItem'
import {OnboardingCarouselPagination} from '@/modules/onboarding/components/OnboardingCarouselPagination'
import {onboardingData} from '@/modules/onboarding/data/onboarding'

export const OnboardingCarousel = () => {
  const {width} = useWindowDimensions()
  const progress = useSharedValue<number>(0)
  const {isPortrait} = useDeviceContext()

  const ref = useRef<ICarouselInstance>(null)

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

  return (
    <Box
      insetBottom={isPortrait ? 'md' : 'xl'}
      shrink={1}>
      <Carousel
        data={onboardingData}
        loop={false}
        onProgressChange={(_offsetProgress, absoluteProgress) => {
          progress.value = absoluteProgress
        }}
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
        data={onboardingData}
        onPress={onPressPagination}
        progress={progress}
      />
    </Box>
  )
}
