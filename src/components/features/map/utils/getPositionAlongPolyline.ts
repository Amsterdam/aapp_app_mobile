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
  t: number,
): {coordinate: LatLng; rotation: number} => {
  'worklet'
  const totalLength = coords.reduce((sum, _, i) => {
    if (i === 0) return 0

    return sum + distanceBetween(coords[i - 1], coords[i])
  }, 0)

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
