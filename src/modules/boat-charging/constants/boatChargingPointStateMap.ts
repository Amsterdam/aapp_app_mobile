import type {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'
import type {ComponentProps} from 'react'
import {SvgIconsConfig} from '@/components/ui/media/svgIcons'
import {boatChargingSvgIcons} from '@/modules/boat-charging/constants/icons'
import {BoatChargingPointState} from '@/modules/boat-charging/types'
import {themes} from '@/themes/themes'

export const boatChargingPointStateMap: Record<
  BoatChargingPointState,
  {icon: ComponentProps<typeof CustomMarkerIcon>['icon']; label: string}
> = {
  [BoatChargingPointState.free]: {
    label: 'Vrij',
    icon: {
      circleColor: themes.light.color.text.confirm,
      pathColor: themes.light.color.text.inverse,
      path: SvgIconsConfig.lightning.filled.path,
    },
  },
  [BoatChargingPointState.occupied]: {
    label: 'Bezet',
    icon: {
      circleColor: themes.light.color.text.secondary,
      pathColor: themes.light.color.text.inverse,
      path: boatChargingSvgIcons['lightning-strikethrough'].filled.path,
    },
  },
  [BoatChargingPointState.malfunction]: {
    label: 'Storing',
    icon: {
      circleColor: themes.light.color.text.secondary,
      pathColor: themes.light.color.text.inverse,
      path: boatChargingSvgIcons['exclamation-mark'].filled.path,
    },
  },
}
