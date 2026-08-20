import {useEffect} from 'react'
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg'
import {useTheme} from '@/themes/useTheme'

const BAR_WIDTH = 100
const BAR_HEIGHT = 8
const ANIMATION_DURATION = 2000
const ANIMATION_DELAY = 250

const AnimatedRect = Animated.createAnimatedComponent(Rect)

type Props = {
  active?: boolean
}

export const LoadingBar = ({active = true}: Props) => {
  const translateX = useSharedValue(-1)

  useEffect(() => {
    if (active) {
      translateX.value = withRepeat(
        withDelay(
          ANIMATION_DELAY,
          withTiming(1, {
            duration: ANIMATION_DURATION,
            easing: Easing.linear,
          }),
        ),
        -1,
      )
    } else {
      cancelAnimation(translateX)
      translateX.value = -1
    }

    return () => {
      cancelAnimation(translateX)
    }
  }, [translateX, active])

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
