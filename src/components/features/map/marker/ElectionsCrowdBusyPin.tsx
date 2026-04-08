import {Circle} from 'react-native-svg'
import {
  MapMarkerBase,
  type MapMarkerBaseProps,
} from '@/components/features/map/marker/MarkerBase'

export const MapMarkerElectionsCrowdBusyPin = (props: MapMarkerBaseProps) => (
  <MapMarkerBase {...props}>
    <Circle
      cx={20.3336}
      cy={18}
      fill="#EC0000"
      r={10.6944}
    />
    <Circle
      cx={14.1666}
      cy={18}
      fill="white"
      r={1.94444}
    />
    <Circle
      cx={20.0001}
      cy={18}
      fill="white"
      r={1.94444}
    />
    <Circle
      cx={25.8336}
      cy={18}
      fill="white"
      r={1.94444}
    />
  </MapMarkerBase>
)
