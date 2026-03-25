import {Easing} from 'react-native-reanimated'

export const ANIMATION_EASING = Easing.out(Easing.exp)

export const ANDROID_ANIMATION_DURATION_MS = 350

export const IOS_SPRING_CONFIG = {
  damping: 500,
  stiffness: 1000,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 10,
  restSpeedThreshold: 10,
} as const

export const ANDROID_TIMING_CONFIG = {
  duration: ANDROID_ANIMATION_DURATION_MS,
  easing: ANIMATION_EASING,
} as const
