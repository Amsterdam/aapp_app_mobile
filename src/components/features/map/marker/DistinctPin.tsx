import {mapSvgIcons} from '@/components/features/map/constants/icons'
import {CustomMarker} from '@/components/features/map/marker/CustomMarker'

export const MapMarkerDistinctPin = () => (
  <CustomMarker
    icon={{
      path: mapSvgIcons['marker-distinct'].default.path,
      pathColor: '#004699',
    }}
    testID="DistinctPinMarker"
  />
)
