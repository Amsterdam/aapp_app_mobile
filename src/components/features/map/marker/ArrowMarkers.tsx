import {useMemo} from 'react'
import {type LatLng} from 'react-native-maps'
import {TravelingArrowMarker} from '@/components/features/map/marker/TravelingArrowMarker'
import {distanceBetween} from '@/components/features/map/utils/getArrowsAlongPolyLine'

type Props = {
  coordinates: LatLng[]
}

const ARROW_SPACING_METERS = 1000 // distance between arrows
const METERS_PER_SECOND = 300 // travel speed

const getTotalLength = (coords: LatLng[]): number => {
  let total = 0

  for (let i = 0; i < coords.length - 1; i++) {
    total += distanceBetween(coords[i], coords[i + 1])
  }

  return total
}

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
      duration={duration}
      key={i}
      phase={i / arrowCount}
    />
  ))
}
