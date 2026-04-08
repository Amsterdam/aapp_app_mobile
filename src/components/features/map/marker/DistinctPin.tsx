import {Path} from 'react-native-svg'
import {
  MapMarkerBase,
  type MapMarkerBaseProps,
} from '@/components/features/map/marker/MarkerBase'

export const MapMarkerDistinctPin = (props: MapMarkerBaseProps) => (
  <MapMarkerBase {...props}>
    <Path
      d="M19.9999 24.1231L14.2104 27.5003L15.1754 20.7459L10.8333 16.4038L17.1052 15.4389L19.9999 9.16699L22.8947 15.4389L29.1666 16.4038L24.8245 20.7459L25.7894 27.5003L19.9999 24.1231Z"
      fill="#004699"
    />
  </MapMarkerBase>
)
