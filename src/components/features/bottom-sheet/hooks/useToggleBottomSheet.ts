import {useEffect} from 'react'
import {withTiming, withSpring, SharedValue} from 'react-native-reanimated'
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
  onChange,
}: {
  closedOffset: number
  isAndroid: boolean
  isOpen: boolean
  isOpenShared: SharedValue<number>
  onChange: (value: number) => void
  setIsVisible: (visible: boolean) => void
  translateY: SharedValue<number>
}) => {
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      translateY.value = isAndroid
        ? withTiming(0, ANDROID_TIMING_CONFIG)
        : withSpring(0, IOS_SPRING_CONFIG)
      onChange(0)

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
    isOpen,
    isOpenShared,
    onChange,
    setIsVisible,
    translateY,
  ])
}
