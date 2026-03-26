// eslint-disable-next-line no-restricted-imports
import ReanimatedCarousel from 'react-native-reanimated-carousel'
import type {PanGesture} from 'react-native-gesture-handler'
import type {TCarouselProps} from 'react-native-reanimated-carousel'
import type {TParallaxModeProps} from 'react-native-reanimated-carousel/lib/typescript/layouts/parallax'

type Props<T> = Pick<
  TCarouselProps<T>,
  'data' | 'defaultIndex' | 'ref' | 'onProgressChange' | 'renderItem' | 'style'
> & {width: number} & TParallaxModeProps

const onConfigurePanGesture = (panGesture: PanGesture) => {
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
  modeConfig,
  style,
  onProgressChange,
  renderItem,
  width,
  mode,
}: Props<T>) => (
  <ReanimatedCarousel<T>
    data={data}
    defaultIndex={defaultIndex}
    loop={false}
    mode={mode}
    modeConfig={modeConfig}
    onConfigurePanGesture={onConfigurePanGesture}
    onProgressChange={onProgressChange}
    pagingEnabled
    ref={ref}
    renderItem={renderItem}
    snapEnabled
    style={[{width}, style]}
    vertical={false}
  />
)
