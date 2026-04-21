import {useMemo} from 'react'
import {Polyline} from 'react-native-maps'
import {ArrowMarkers} from '@/components/features/map/marker/ArrowMarkers'
import {
  coordinatesToLatLng,
  type Position,
} from '@/utils/transform/coordinatesToLatLng'

type Props = {
  coordinates: Position | Position[] | Position[][] | Position[][][]
  strokeColor?: number | string | null
  strokeWidth?: number | null
}

export const LineString = ({coordinates, strokeColor, strokeWidth}: Props) => {
  const latLngCoordinates = useMemo(
    () => coordinatesToLatLng(coordinates),
    [coordinates],
  )

  if (
    !latLngCoordinates ||
    latLngCoordinates.length === 0 ||
    !strokeColor ||
    !strokeWidth
  ) {
    return null
  }

  return (
    <>
      <Polyline
        coordinates={latLngCoordinates}
        strokeColor={strokeColor?.toString()}
        strokeWidth={strokeWidth}
      />
      <ArrowMarkers coordinates={latLngCoordinates} />
    </>
  )
}
