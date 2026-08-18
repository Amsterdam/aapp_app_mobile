import type {Coordinates} from '@/types/location'

const toDegreesDecimalMinutes = (
  value: number,
  type: 'latitude' | 'longitude',
): string => {
  const absoluteValue = Math.abs(value)
  const totalThousandthsOfMinute = Math.round(absoluteValue * 60000)
  const degrees = Math.floor(totalThousandthsOfMinute / 60000)
  const minutes = (totalThousandthsOfMinute % 60000) / 1000

  const hemisphere =
    type === 'latitude' ? (value >= 0 ? 'N' : 'S') : value >= 0 ? 'E' : 'W'

  const paddedDegrees =
    type === 'longitude'
      ? String(degrees).padStart(3, '0')
      : String(degrees).padStart(2, '0')

  return `${paddedDegrees}° ${minutes.toFixed(3)}' ${hemisphere}`
}

export const coordinatesToDDM = (
  coordinates: Coordinates | null | undefined,
): string | undefined => {
  if (coordinates?.lat == null || coordinates.lon == null) {
    return undefined
  }

  const {lat, lon} = coordinates

  return `${toDegreesDecimalMinutes(lat, 'latitude')}, ${toDegreesDecimalMinutes(lon, 'longitude')}`
}
