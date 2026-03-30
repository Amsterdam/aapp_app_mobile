import {useEffect, useRef} from 'react'
import {
  withTiming,
  withSpring,
  withSequence,
  SharedValue,
} from 'react-native-reanimated'
import {scheduleOnRN} from 'react-native-worklets'
import {
  ANDROID_CLOSE_TIMING_CONFIG,
  ANDROID_TIMING_CONFIG,
  IOS_CLOSE_TIMING_CONFIG,
  IOS_SPRING_CONFIG,
} from '@/components/features/bottom-sheet/constants'

export const useToggleBottomSheet = ({
  isOpen,
  setIsVisible,
  translateY,
  isAndroid,
  closedOffset,
  isOpenShared,
  isLayoutReady,
  windowHeight,
  onChange,
}: {
  closedOffset: number
  isAndroid: boolean
  isLayoutReady: boolean
  isOpen: boolean
  isOpenShared: SharedValue<number>
  onChange: (value: number) => void
  setIsVisible: (visible: boolean) => void
  translateY: SharedValue<number>
  windowHeight: number
}) => {
  const hasStartedOpenRef = useRef(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)

      if (!isLayoutReady) {
        hasStartedOpenRef.current = false
        translateY.value = windowHeight

        return
      }

      if (!hasStartedOpenRef.current) {
        hasStartedOpenRef.current = true
        translateY.value = withSequence(
          withTiming(closedOffset, {duration: 0}),
          isAndroid
            ? withTiming(0, ANDROID_TIMING_CONFIG)
            : withSpring(0, IOS_SPRING_CONFIG),
        )
      } else {
        translateY.value = isAndroid
          ? withTiming(0, ANDROID_TIMING_CONFIG)
          : withSpring(0, IOS_SPRING_CONFIG)
      }

      onChange(0)

      return
    }

    hasStartedOpenRef.current = false

    if (!isLayoutReady) {
      return
    }

    translateY.value = isAndroid
      ? withTiming(closedOffset, ANDROID_CLOSE_TIMING_CONFIG, finished => {
          if (finished && isOpenShared.value === 0) {
            scheduleOnRN(setIsVisible, false)
          }
        })
      : withTiming(closedOffset, IOS_CLOSE_TIMING_CONFIG, finished => {
          if (finished && isOpenShared.value === 0) {
            scheduleOnRN(setIsVisible, false)
          }
        })
    onChange(-1)
  }, [
    closedOffset,
    isAndroid,
    isLayoutReady,
    isOpen,
    isOpenShared,
    onChange,
    setIsVisible,
    translateY,
    windowHeight,
  ])
}
