import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {Theme} from '@/themes/themes'
import {BoatChargingPointState} from '@/modules/boat-charging/types'

export const boatChargingPointStateMap: Record<
  BoatChargingPointState,
  {color: keyof Theme['color']['text']; icon: SvgIconName; label: string}
> = {
  [BoatChargingPointState.free]: {
    label: 'Vrij',
    icon: 'boat-charging-free',
    color: 'confirm',
  },
  [BoatChargingPointState.occupied]: {
    label: 'Bezet',
    icon: 'boat-charging-occupied',
    color: 'secondary',
  },
  [BoatChargingPointState.malfunction]: {
    label: 'Storing',
    icon: 'boat-charging-malfunction',
    color: 'secondary',
  },
}
