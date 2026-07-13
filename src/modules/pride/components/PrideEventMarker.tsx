import {CustomMarker} from '@/components/features/map/marker/CustomMarker'
import {PRIDE_EVENT_ICON_CONFIG} from '@/modules/pride/constants'

export const PrideEventMarker = () => (
  <CustomMarker
    icon={PRIDE_EVENT_ICON_CONFIG}
    testID="PrideEventMarker"
  />
)
