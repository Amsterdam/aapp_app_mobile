import {Polyline, type LatLng, type Region} from 'react-native-maps'
import {calculateOffsetLineString} from '@/components/features/map/line-string/calculateOffsetLineString'

type Props = {
  latLngCoordinates: LatLng[]
  onPress: () => void
  region: Region | undefined
}
const STROKE_WIDTH = 3

const OFFSET_SCALE_FACTOR = 0.003

const DEFAULT_LATITUDE_DELTA = 0.01

export const RainbowPolyLine = ({
  latLngCoordinates,
  region,
  onPress,
}: Props) => {
  const offsetSize =
    OFFSET_SCALE_FACTOR * (region?.latitudeDelta || DEFAULT_LATITUDE_DELTA)

  return (
    <>
      <Polyline
        coordinates={calculateOffsetLineString(
          latLngCoordinates,
          1.5 * offsetSize,
        )}
        onPress={onPress}
        strokeColor={'#ff0000'}
        strokeWidth={STROKE_WIDTH}
        tappable
      />
      <Polyline
        coordinates={calculateOffsetLineString(
          latLngCoordinates,
          0.5 * offsetSize,
        )}
        onPress={onPress}
        strokeColor={'#ffc400'}
        strokeWidth={STROKE_WIDTH}
        tappable
      />
      <Polyline
        coordinates={calculateOffsetLineString(
          latLngCoordinates,
          -0.5 * offsetSize,
        )}
        onPress={onPress}
        strokeColor={'#00bf07'}
        strokeWidth={STROKE_WIDTH}
        tappable
      />
      <Polyline
        coordinates={calculateOffsetLineString(
          latLngCoordinates,
          -1.5 * offsetSize,
        )}
        onPress={onPress}
        strokeColor={'#004ffb'}
        strokeWidth={STROKE_WIDTH}
        tappable
      />
    </>
  )
}
