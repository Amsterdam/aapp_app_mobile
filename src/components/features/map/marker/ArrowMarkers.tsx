import {useMemo} from 'react'
import {type LatLng} from 'react-native-maps'
import {TravelingArrowMarker} from '@/components/features/map/marker/TravelingArrowMarker'
import {distanceBetween} from '@/components/features/map/utils/getArrowsAlongPolyLine'

type Props = {
  coordinates: LatLng[]
}

const ARROW_SPACING_METERS = 400 // distance between arrows
const METERS_PER_SECOND = 30 // travel speed
const FADE_DURATION = 200

const getTotalLength = (coords: LatLng[]): number =>
  coords.reduce((total, coord, index) => {
    const next = coords[index + 1]

    if (!next) {
      return total
    }

    return total + distanceBetween(coord, next)
  }, 0)

export const ArrowMarkers = ({coordinates}: Props) => {
  const totalLength = useMemo(() => getTotalLength(coordinates), [coordinates])
  const arrowCount = Math.max(1, Math.round(totalLength / ARROW_SPACING_METERS))
  const duration = (totalLength / METERS_PER_SECOND) * 1000 // ms

  if (coordinates.length < 2) {
    return null
  }

  return Array.from({length: arrowCount}).map((_, i) => (
    <TravelingArrowMarker
      coords={coordinates}
      fadeDuration={FADE_DURATION}
      key={i}
      phase={(0.5 * i) / arrowCount + (0.5 * (i + 1)) / arrowCount}
      totalLength={totalLength}
      travelDuration={duration}
    />
  ))
}
