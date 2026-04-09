import {Circle, Path} from 'react-native-svg'
import {
  MapMarkerBase,
  type MapMarkerBaseProps,
} from '@/components/features/map/marker/MarkerBase'

export const MapMarkerElectionsCrowdUnknownPin = (
  props: MapMarkerBaseProps,
) => (
  <MapMarkerBase {...props}>
    <Circle
      cx={20.3336}
      cy={18}
      fill="#767676"
      r={10.6944}
    />
    <Path
      d="M22.9169 18C22.9169 16.3892 21.6111 15.0833 20.0003 15.0833C18.3894 15.0833 17.0836 16.3892 17.0836 18C17.0836 19.6108 18.3894 20.9167 20.0003 20.9167V22.8611C17.3156 22.8611 15.1392 20.6847 15.1392 18C15.1392 15.3153 17.3156 13.1389 20.0003 13.1389C22.685 13.1389 24.8614 15.3153 24.8614 18C24.8614 20.6847 22.685 22.8611 20.0003 22.8611V20.9167C21.6111 20.9167 22.9169 19.6108 22.9169 18Z"
      fill="white"
    />
  </MapMarkerBase>
)
