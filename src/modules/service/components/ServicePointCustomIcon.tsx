import {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'
import type {TestProps} from '@/components/ui/types'
import type {ServiceMapResponseIcon} from '@/modules/service/types'

type Props = {
  icon: ServiceMapResponseIcon
} & TestProps

export const ServicePointCustomIcon = ({
  icon: {path_color, path, circle_color, colors},
  testID,
}: Props) => (
  <CustomMarkerIcon
    icon={{
      path,
      pathColor: path_color,
      circleColor: circle_color,
      colors,
    }}
    testID={testID}
  />
)
