import {Easing} from 'react-native-reanimated'

export const IOS_SPRING_CONFIG = {
  damping: 500,
  stiffness: 1000,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 10,
  restSpeedThreshold: 10,
} as const

export const IOS_CLOSE_DURATION_MS = 400

export const IOS_CLOSE_EASING = Easing.bezier(0.4, 0.0, 0.2, 1.0)

export const IOS_CLOSE_TIMING_CONFIG = {
  duration: IOS_CLOSE_DURATION_MS,
  easing: IOS_CLOSE_EASING,
} as const

export const ANDROID_ANIMATION_DURATION_MS = 300

export const ANDROID_ANIMATION_EASING = Easing.bezier(0.05, 0.7, 0.1, 1.0)

export const ANDROID_TIMING_CONFIG = {
  duration: ANDROID_ANIMATION_DURATION_MS,
  easing: ANDROID_ANIMATION_EASING,
} as const

export const ANDROID_CLOSE_DURATION_MS = 400

export const ANDROID_CLOSE_TIMING_CONFIG = {
  duration: ANDROID_CLOSE_DURATION_MS,
  easing: ANDROID_ANIMATION_EASING,
} as const

export const HANDLE_INDICATOR = {
  WIDTH: 48,
  HEIGHT: 4,
}
