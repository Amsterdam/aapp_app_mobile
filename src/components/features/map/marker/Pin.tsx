import {mapSvgIcons} from '@/components/features/map/constants/icons'
import {CustomMarker} from '@/components/features/map/marker/CustomMarker'

export const MapMarkerPin = () => (
  <CustomMarker
    icon={{
      path: mapSvgIcons['marker-point'].default.path,
      pathColor: '#181818',
    }}
    testID="PinMarker"
  />
)
