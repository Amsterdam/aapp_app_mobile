import {Circle} from 'react-native-svg'
import {
  MapMarkerBase,
  type MapMarkerBaseProps,
} from '@/components/features/map/marker/MarkerBase'

export const MapMarkerElectionsCrowdCalmPin = (props: MapMarkerBaseProps) => (
  <MapMarkerBase {...props}>
    <Circle
      cx={20.0001}
      cy={18.3333}
      fill="#00A03C"
      r={10.6944}
    />
    <Circle
      cx={20.0001}
      cy={18}
      fill="white"
      r={1.94444}
    />
  </MapMarkerBase>
)
