import {useState, useRef} from 'react'
import {useWindowDimensions} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'
import type {CarouselRef} from 'react-native-reanimated-carousel'

export const useCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const progress = useSharedValue<number>(0)

  const onProgressChange = (absoluteProgress: number) => {
    setCurrentIndex(Math.round(absoluteProgress))
    progress.value = Math.max(0, absoluteProgress)
  }
  const ref = useRef<CarouselRef>(null)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      index,
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
