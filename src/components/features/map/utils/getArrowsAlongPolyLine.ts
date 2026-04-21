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

export type Arrow = {coordinate: LatLng; rotation: number}
