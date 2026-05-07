import type {TestProps} from '@/components/ui/types'
import type {ServiceMapResponseIcon} from '@/modules/service/types'
import {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'

type Props = {
  icon: ServiceMapResponseIcon
} & TestProps

export const ServicePointCustomIcon = ({
  icon: {path_color, path, circle_color},
  testID,
}: Props) => (
  <CustomMarkerIcon
    icon={{
      path,
      pathColor: path_color,
      circleColor: circle_color,
    }}
    testID={testID}
  />
)
