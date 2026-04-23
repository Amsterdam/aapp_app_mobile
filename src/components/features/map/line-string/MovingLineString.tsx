import {useEffect, useMemo, useState} from 'react'
import {Polyline, type LatLng, type MapPolylineProps} from 'react-native-maps'
import {
  useAnimatedReaction,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import {runOnJS} from 'react-native-worklets'
import {distanceBetween} from '@/components/features/map/utils/getArrowsAlongPolyLine'

type Props = {
  duration?: number
  inverted?: boolean
  lineLength?: number
  numberOfReps?: number
} & Omit<MapPolylineProps, 'lineDashPattern'>

const getTotalLength = (coords: LatLng[]): number =>
  coords.reduce((total, coord, index) => {
    const next = coords[index + 1]

    if (!next) {
      return total
    }

    return total + distanceBetween(coord, next)
  }, 0)

const DURATION = 4000

export const MovingLineString = ({
  lineLength,
  inverted = false,
  coordinates,
  duration = DURATION,
  numberOfReps = Infinity,
  ...props
}: Props) => {
  const [offset, setOffset] = useState(0)

  const progress = useSharedValue(-1)

  const {segmentLength, steps} = useMemo(() => {
    const length = getTotalLength(coordinates)
    const sLength = lineLength || length / 2

    return {
      totalLength: length,
      segmentLength: sLength,
      steps: Math.round(length / sLength),
    }
  }, [coordinates, lineLength])

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(steps + 1, {duration, easing: Easing.linear}),
      numberOfReps,
    )
  }, [steps, progress, numberOfReps, duration])

  useAnimatedReaction(
    () => progress.value,
    value => runOnJS(setOffset)(value),
  )

  const pattern = useMemo(() => {
    const basePattern = [
      segmentLength * offset, // offset pushing the moving line forward
      segmentLength, // moving line
      Infinity,
    ]

    if (inverted) {
      return basePattern
    }

    return [0, ...basePattern]
  }, [inverted, offset, segmentLength])

  return (
    <Polyline
      coordinates={coordinates}
      lineDashPattern={pattern}
      {...props}
    />
  )
}
