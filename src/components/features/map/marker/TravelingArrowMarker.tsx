import {useState, useRef, useEffect} from 'react'
import {View} from 'react-native'
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

const FADE_DURATION = 200

export const TravelingArrowMarker = ({
  coords,
  duration,
  phase,
}: {
  coords: LatLng[]
  duration: number
  phase: number
}) => {
  const progress = useSharedValue(phase)
  const opacity = useSharedValue(0)
  const [position, setPosition] = useState<{
    coordinate: LatLng
    rotation: number
  } | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const cycleRef = useRef<() => void>(() => undefined)
  const isFirstCycleRef = useRef(true)

  useEffect(() => {
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
        {duration: FADE_DURATION},
        onFadeOutComplete,
      )
    }

    const onTravelComplete = () => {
      'worklet'
      fadeOut()
    }

    cycleRef.current = () => {
      opacity.value = withTiming(1, {duration: FADE_DURATION})

      const cycleDuration = isFirstCycleRef.current
        ? duration * (1 - phase)
        : duration

      isFirstCycleRef.current = false

      progress.value = withTiming(
        1,
        {duration: cycleDuration, easing: Easing.linear},
        onTravelComplete,
      )
    }

    cycleRef.current()
  }, [duration, opacity, phase, progress])

  useAnimatedReaction(
    () => progress.value,
    t => {
      if (t < 0.01) {
        runOnJS(setIsVisible)(false)
      } else {
        runOnJS(setIsVisible)(true)
        runOnJS(setPosition)(getPositionAlongPolyline(coords, t))
      }
    },
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
      tracksViewChanges
      zIndex={0}>
      <Animated.View style={animatedStyle}>
        <View
          style={{
            transform: [{rotate: `${position.rotation - 90}deg`}],
          }}>
          <Icon name="play" />
        </View>
      </Animated.View>
    </Marker>
  )
}
