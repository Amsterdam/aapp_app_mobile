import type {ServiceMapResponseIcon} from '@/modules/service/types'
import {CustomMarker} from '@/components/features/map/marker/CustomMarker'

type Props = {
  icon: ServiceMapResponseIcon
}
export const ServicePointCustomMarker = ({icon}: Props) => (
  <CustomMarker
    icon={{
      circleColor: icon.circle_color,
      path: icon.path,
      pathColor: icon.path_color,
    }}
    testID="ServicePointCustomMarker"
  />
)
