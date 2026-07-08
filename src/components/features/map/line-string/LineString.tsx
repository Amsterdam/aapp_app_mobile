import {useMemo} from 'react'
import {Polyline, type Region} from 'react-native-maps'
import {RainbowPolyLine} from '@/components/features/map/line-string/RainbowPolyLine'
import {ArrowMarkers} from '@/components/features/map/marker/ArrowMarkers'
import {
  coordinatesToLatLng,
  type Position,
} from '@/utils/transform/coordinatesToLatLng'

type Props = {
  coordinates: Position | Position[] | Position[][] | Position[][][]
  id: string | number
  onPress: (id: string | number) => void
  region: Region | undefined
  strokeColor?: number | string | null
  strokeWidth?: number | null
  type: 'rainbow' | 'default'
}

export const LineString = ({
  coordinates,
  id,
  onPress,
  strokeColor,
  strokeWidth,
  region,
  type,
}: Props) => {
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
      {type === 'rainbow' ? (
        <RainbowPolyLine
          latLngCoordinates={latLngCoordinates}
          onPress={() => onPress(id)}
          region={region}
          strokeWidth={strokeWidth}
        />
      ) : (
        <Polyline
          coordinates={latLngCoordinates}
          onPress={() => onPress(id)}
          strokeColor={strokeColor?.toString()}
          strokeWidth={strokeWidth}
          tappable
        />
      )}
      <ArrowMarkers
        coordinates={latLngCoordinates}
        size={type === 'rainbow' ? 'ml' : 'md'}
      />
    </>
  )
}
