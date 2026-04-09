import {Circle} from 'react-native-svg'
import {
  MapMarkerBase,
  type MapMarkerBaseProps,
} from '@/components/features/map/marker/MarkerBase'

export const MapMarkerElectionsCrowdMediumPin = (props: MapMarkerBaseProps) => (
  <MapMarkerBase {...props}>
    <Circle
      cx={20.0001}
      cy={18.3333}
      fill="#FF9100"
      r={10.6944}
    />
    <Circle
      cx={17.0836}
      cy={18}
      fill="white"
      r={1.94444}
    />
    <Circle
      cx={22.9166}
      cy={18}
      fill="white"
      r={1.94444}
    />
  </MapMarkerBase>
)
