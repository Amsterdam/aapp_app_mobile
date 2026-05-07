import type {ServiceMapResponseIcon} from '@/modules/service/types'
import {CustomMarker} from '@/components/features/map/marker/CustomMarker'

export const ServicePointCustomMarker = ({
  icon,
}: {
  icon: ServiceMapResponseIcon
}) => (
  <CustomMarker
    icon={{
      circleColor: icon.circle_color,
      path: icon.path,
      pathColor: icon.path_color,
    }}
    testID="ServicePointCustomMarker"
  />
)
