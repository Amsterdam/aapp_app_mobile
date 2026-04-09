import {Circle} from 'react-native-svg'
import {
  MapMarkerBase,
  type MapMarkerBaseProps,
} from '@/components/features/map/marker/MarkerBase'

export const MapMarkerPin = (props: MapMarkerBaseProps) => (
  <MapMarkerBase {...props}>
    <Circle
      cx={20.3334}
      cy={18}
      fill="#181818"
      r={8.75}
    />
  </MapMarkerBase>
)
