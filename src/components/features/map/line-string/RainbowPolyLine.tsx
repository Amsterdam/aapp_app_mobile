import {Polyline, type LatLng, type Region} from 'react-native-maps'
import {calculateOffsetLineString} from '@/components/features/map/line-string/calculateOffsetLineString'

type Props = {
  latLngCoordinates: LatLng[]
  onPress: () => void
  region: Region | undefined
}
const strokeWidth = 3

export const RainbowPolyLine = ({
  latLngCoordinates,
  region,
  onPress,
}: Props) => {
  const offsetSize = 0.003 * (region?.latitudeDelta || 0.01)

  return (
    <>
      <Polyline
        coordinates={calculateOffsetLineString(
          latLngCoordinates,
          2 * offsetSize,
        )}
        onPress={onPress}
        strokeColor={'#6F00E6'}
        strokeWidth={strokeWidth}
        tappable
      />
      <Polyline
        coordinates={calculateOffsetLineString(latLngCoordinates, offsetSize)}
        onPress={onPress}
        strokeColor={'#ff0000'}
        strokeWidth={strokeWidth}
        tappable
      />
      <Polyline
        coordinates={latLngCoordinates}
        onPress={onPress}
        strokeColor={'#ffc400'}
        strokeWidth={strokeWidth}
        tappable
      />
      <Polyline
        coordinates={calculateOffsetLineString(
          latLngCoordinates,
          -1 * offsetSize,
        )}
        onPress={onPress}
        strokeColor={'#00bf07'}
        strokeWidth={strokeWidth}
        tappable
      />
      <Polyline
        coordinates={calculateOffsetLineString(
          latLngCoordinates,
          -2 * offsetSize,
        )}
        onPress={onPress}
        strokeColor={'#004ffb'}
        strokeWidth={strokeWidth}
        tappable
      />
    </>
  )
}
