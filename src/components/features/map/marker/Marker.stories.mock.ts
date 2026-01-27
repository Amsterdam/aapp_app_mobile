import type {ImageSourcePropType} from 'react-native'
import {MarkerVariant} from '@/components/features/map/marker/markers.generated'

export const MOCK_MARKER_MAP = {
  [MarkerVariant.distinctPin]:
    require('@/../assets/images/map/distinct_pin.png') as ImageSourcePropType,
  [MarkerVariant.electionsCrowdBusyPin]:
    require('@/../assets/images/map/elections_crowd_busy_pin.png') as ImageSourcePropType,
  [MarkerVariant.electionsCrowdCalmPin]:
    require('@/../assets/images/map/elections_crowd_calm_pin.png') as ImageSourcePropType,
  [MarkerVariant.electionsCrowdMediumPin]:
    require('@/../assets/images/map/elections_crowd_medium_pin.png') as ImageSourcePropType,
  [MarkerVariant.electionsCrowdUnknownPin]:
    require('@/../assets/images/map/elections_crowd_unknown_pin.png') as ImageSourcePropType,
  [MarkerVariant.pin]:
    require('@/../assets/images/map/pin.png') as ImageSourcePropType,
  [MarkerVariant.selectedPin]:
    require('@/../assets/images/map/selected_pin.png') as ImageSourcePropType,
} satisfies Record<MarkerVariant, ImageSourcePropType>
