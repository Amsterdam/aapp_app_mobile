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

/**
 * Formats coordinates into degrees decimal minutes (DDM) format.
 * @param coordinates
 * @returns The coordinates formatted in DDM, or undefined if the input is invalid.
 * @example coordinatesToDDM({ lat: 52.3676, lon: 4.9041 }) // "52° 22.056' N, 004° 54.246' E"
 */
export const coordinatesToDDM = (
  coordinates: Coordinates | null | undefined,
): string | undefined => {
  if (coordinates?.lat == null || coordinates.lon == null) {
    return undefined
  }

  const {lat, lon} = coordinates

  return `${toDegreesDecimalMinutes(lat, 'latitude')}, ${toDegreesDecimalMinutes(lon, 'longitude')}`
}
