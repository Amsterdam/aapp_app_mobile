import type {LatLng} from 'react-native-maps'
import {
  bearingBetween,
  distanceBetween,
} from '@/components/features/map/utils/getArrowsAlongPolyLine'

/** Interpolate a point at `fraction` (0–1) between a and b */
const interpolate = (a: LatLng, b: LatLng, fraction: number) => {
  'worklet'

  return {
    latitude: a.latitude + (b.latitude - a.latitude) * fraction,
    longitude: a.longitude + (b.longitude - a.longitude) * fraction,
  }
}

export const getPositionAlongPolyline = (
  coords: LatLng[],
  totalLength: number,
  t: number,
): {coordinate: LatLng; rotation: number} => {
  'worklet'

  if (coords.length === 0) {
    return {
      coordinate: {latitude: 0, longitude: 0},
      rotation: 0,
    }
  }

  if (coords.length === 1) {
    return {
      coordinate: coords[0],
      rotation: 0,
    }
  }

  const target = t * totalLength
  let accumulated = 0

  for (let i = 0; i < coords.length - 1; i++) {
    const segLen = distanceBetween(coords[i], coords[i + 1])

    if (accumulated + segLen >= target) {
      const fraction = (target - accumulated) / segLen

      return {
        coordinate: interpolate(coords[i], coords[i + 1], fraction),
        rotation: bearingBetween(coords[i], coords[i + 1]),
      }
    }

    accumulated += segLen
  }

  // Reached end
  return {
    coordinate: coords[coords.length - 1],
    rotation: bearingBetween(
      coords[coords.length - 2],
      coords[coords.length - 1],
    ),
  }
}
