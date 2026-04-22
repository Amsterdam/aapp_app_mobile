import {useState, useRef, useEffect} from 'react'
// eslint-disable-next-line no-restricted-imports
import {Marker, type LatLng} from 'react-native-maps'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedReaction,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated'
import {runOnJS} from 'react-native-worklets'
import {getPositionAlongPolyline} from '@/components/features/map/utils/getPositionAlongPolyline'
import {Icon} from '@/components/ui/media/Icon'

type Props = {
  coords: LatLng[]
  enableAnimation?: boolean
  fadeDuration: number
  phase: number
  totalLength: number
  travelDuration: number
}

export const TravelingArrowMarker = ({
  coords,
  travelDuration,
  fadeDuration,
  phase,
  totalLength,
  enableAnimation = true,
}: Props) => {
  const progress = useSharedValue(phase)
  const opacity = useSharedValue(1)
  const [position, setPosition] = useState<{
    coordinate: LatLng
    rotation: number
  } | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const cycleRef = useRef<() => void>(() => undefined)
  const isFirstCycleRef = useRef(true)

  useEffect(() => {
    if (enableAnimation) {
      const repeat = () => cycleRef.current()

      const onFadeOutComplete = () => {
        'worklet'
        progress.value = 0
        runOnJS(repeat)()
      }

      const fadeOut = () => {
        'worklet'
        opacity.value = withTiming(
          0,
          {duration: fadeDuration},
          onFadeOutComplete,
        )
      }

      const onTravelComplete = () => {
        'worklet'
        fadeOut()
      }

      cycleRef.current = () => {
        opacity.value = withTiming(1, {duration: fadeDuration})

        const cycleDuration = isFirstCycleRef.current
          ? travelDuration * (1 - phase)
          : travelDuration

        isFirstCycleRef.current = false

        progress.value = withTiming(
          1,
          {duration: cycleDuration, easing: Easing.linear},
          onTravelComplete,
        )
      }

      cycleRef.current()
    }
  }, [travelDuration, opacity, phase, progress, fadeDuration, enableAnimation])

  useAnimatedReaction(
    () => progress.value,
    t => {
      if (t < 0.01) {
        runOnJS(setIsVisible)(false)
      } else {
        runOnJS(setIsVisible)(true)
        runOnJS(setPosition)(getPositionAlongPolyline(coords, totalLength, t))
      }
    },
    [coords, totalLength],
  )

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  if (!position || !isVisible) return null

  return (
    <Marker
      anchor={{x: 0.5, y: 0.5}}
      coordinate={position.coordinate}
      flat
      rotation={position.rotation - 90}
      tracksViewChanges
      zIndex={0}>
      <Animated.View style={animatedStyle}>
        <Icon name="play" />
      </Animated.View>
    </Marker>
  )
}
