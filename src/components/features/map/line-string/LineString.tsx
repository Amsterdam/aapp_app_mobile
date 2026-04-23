import {useMemo} from 'react'
import {Polyline} from 'react-native-maps'
import {MovingLineString} from '@/components/features/map/line-string/MovingLineString'
import {
  coordinatesToLatLng,
  type Position,
} from '@/utils/transform/coordinatesToLatLng'

type Props = {
  coordinates: Position | Position[] | Position[][] | Position[][][]
  id: string | number
  onPress: (id: string | number) => void
  strokeColor?: number | string | null
  strokeWidth?: number | null
}

export const LineString = ({
  coordinates,
  id,
  onPress,
  strokeColor,
  strokeWidth,
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
      <Polyline
        coordinates={latLngCoordinates}
        onPress={() => onPress(id)}
        strokeColor={strokeColor?.toString()}
        strokeWidth={strokeWidth}
        tappable
      />
      <MovingLineString
        coordinates={latLngCoordinates}
        lineLength={100}
        strokeColor={'#000'}
        strokeWidth={strokeWidth}
        tappable={false}
      />
    </>
  )
}
