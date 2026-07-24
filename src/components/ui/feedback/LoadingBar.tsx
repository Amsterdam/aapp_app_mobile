import {useEffect} from 'react'
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg'
import {useTheme} from '@/themes/useTheme'

const BAR_WIDTH = 100
const BAR_HEIGHT = 8
const ANIMATION_DURATION = 2000

const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LoadingBar = () => {
  const translateX = useSharedValue(-1)

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(2, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.quad),
      }),
      -1,
    )

    return () => {
      cancelAnimation(translateX)
    }
  }, [translateX])

  const animatedProps = useAnimatedProps(
    () => ({
      x: translateX.value * BAR_WIDTH,
    }),
    [translateX],
  )

  const {
    color: {
      loadingBar: {background, indicator},
    },
  } = useTheme()

  return (
    <Svg
      height={BAR_HEIGHT}
      preserveAspectRatio="none"
      viewBox={`0 0 ${BAR_WIDTH} ${BAR_HEIGHT}`}
      width="100%">
      <Defs>
        <LinearGradient
          id="chargingBarGradient"
          x1="0%"
          x2="100%"
          y1="0%"
          y2="0%">
          <Stop
            offset="0%"
            stopColor={indicator}
            stopOpacity={0}
          />
          <Stop
            offset="100%"
            stopColor={indicator}
            stopOpacity={0.65}
          />
        </LinearGradient>
      </Defs>
      <Rect
        fill={background}
        height={BAR_HEIGHT}
        width={BAR_WIDTH}
      />
      <AnimatedRect
        animatedProps={animatedProps}
        fill="url(#chargingBarGradient)"
        height={BAR_HEIGHT}
        width={BAR_WIDTH}
      />
    </Svg>
  )
}
