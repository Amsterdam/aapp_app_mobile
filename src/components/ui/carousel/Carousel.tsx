import {
  Carousel as ReanimatedCarousel,
  type CarouselPanGesture,
  type CarouselProps,
  type CarouselRef,
} from 'react-native-reanimated-carousel'
import type {RefObject} from 'react'

type Props<T> = Pick<
  CarouselProps<T>,
  | 'data'
  | 'defaultIndex'
  | 'layout'
  | 'onProgressChange'
  | 'renderItem'
  | 'style'
> & {width: number} & {ref?: RefObject<CarouselRef | null>}

const onConfigurePanGesture = (panGesture: CarouselPanGesture) => {
  'worklet'
  panGesture.activeOffsetX([-10, 10])
}

/**
 * use the Carousel in combination with the useCarousel hook
 */
export const Carousel = <T,>({
  ref,
  data,
  defaultIndex,
  layout,
  style,
  onProgressChange,
  renderItem,
  width,
}: Props<T>) => (
  <ReanimatedCarousel<T>
    data={data}
    defaultIndex={defaultIndex}
    layout={layout}
    loop={false}
    onConfigurePanGesture={onConfigurePanGesture}
    onProgressChange={onProgressChange}
    ref={ref}
    renderItem={renderItem}
    snapMode="page"
    style={[{width}, style]}
  />
)
