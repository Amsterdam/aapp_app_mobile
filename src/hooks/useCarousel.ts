import {useState, useRef} from 'react'
import {useWindowDimensions} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'
import type {ICarouselInstance} from 'react-native-reanimated-carousel'

export const useCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const progress = useSharedValue<number>(0)
  const onProgressChange = (_: number, absoluteProgress: number) => {
    setCurrentIndex(Math.round(absoluteProgress))
    progress.value = Math.max(0, absoluteProgress)
  }
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
  const {width} = useWindowDimensions()

  return {
    progress,
    currentIndex,
    onProgressChange,
    ref,
    onPressPagination,
    width,
  }
}
