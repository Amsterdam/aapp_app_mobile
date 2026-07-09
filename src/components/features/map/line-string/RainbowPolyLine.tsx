import {Polyline, type LatLng, type Region} from 'react-native-maps'
import {calculateOffsetFactor} from '@/components/features/map/line-string/calculateOffsetFactor'
import {calculateOffsetLineString} from '@/components/features/map/line-string/calculateOffsetLineString'

type Props = {
  colors?: string[]
  latLngCoordinates: LatLng[]
  onPress: () => void
  region: Region | undefined
}

const OFFSET_SCALE_FACTOR = 0.003

const DEFAULT_LATITUDE_DELTA = 0.01

export const RainbowPolyLine = ({
  latLngCoordinates,
  region,
  onPress,
  colors,
}: Props) => {
  const strokeWidth = 12 / (colors?.length || 1)
  const offsetSize =
    OFFSET_SCALE_FACTOR * (region?.latitudeDelta || DEFAULT_LATITUDE_DELTA)

  return (
    <>
      {colors?.map((color, index) => (
        <Polyline
          coordinates={calculateOffsetLineString(
            latLngCoordinates,
            calculateOffsetFactor(index, colors.length) * offsetSize,
          )}
          key={index}
          onPress={onPress}
          strokeColor={color}
          strokeWidth={
            index <= colors.length
              ? strokeWidth
              : strokeWidth + 1 / colors.length
          }
          tappable
        />
      ))}
    </>
  )
}
