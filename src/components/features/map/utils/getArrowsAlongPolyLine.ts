import type {LatLng} from 'react-native-maps'

export const distanceBetween = (a: LatLng, b: LatLng): number => {
  'worklet'
  const R = 6371000
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180
  const sinDLat = Math.sin(dLat / 2)
  const sinDLon = Math.sin(dLon / 2)
  const angle =
    sinDLat * sinDLat +
    Math.cos((a.latitude * Math.PI) / 180) *
      Math.cos((b.latitude * Math.PI) / 180) *
      sinDLon *
      sinDLon

  return R * 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle))
}

export const bearingBetween = (a: LatLng, b: LatLng): number => {
  'worklet'
  const lat1 = (a.latitude * Math.PI) / 180
  const lat2 = (b.latitude * Math.PI) / 180
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180
  const y = Math.sin(dLon) * Math.cos(lat2)
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)

  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
}

const interpolate = (a: LatLng, b: LatLng, fraction: number): LatLng => {
  'worklet'

  return {
    latitude: a.latitude + (b.latitude - a.latitude) * fraction,
    longitude: a.longitude + (b.longitude - a.longitude) * fraction,
  }
}

export type Arrow = {coordinate: LatLng; rotation: number}

export const getArrowsAlongPolyline = (
  coords: LatLng[],
  spacing = 80,
): Arrow[] => {
  if (coords.length < 2) return []

  const arrows: Arrow[] = []
  let accumulated = 0
  let nextArrowAt = spacing / 2

  for (let i = 0; i < coords.length - 1; i++) {
    const segLen = distanceBetween(coords[i], coords[i + 1])
    const bearing = bearingBetween(coords[i], coords[i + 1])

    while (accumulated + segLen >= nextArrowAt) {
      const fraction = (nextArrowAt - accumulated) / segLen

      arrows.push({
        coordinate: interpolate(coords[i], coords[i + 1], fraction),
        rotation: bearing,
      })
      nextArrowAt += spacing
    }

    accumulated += segLen
  }

  return arrows
}
