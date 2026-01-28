import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {Theme} from '@/themes/themes'
import {ElectionsState} from '@/modules/elections/types'

export const crowdStateMap: Record<
  ElectionsState,
  {color: keyof Theme['color']['text']; icon: SvgIconName; label: string}
> = {
  [ElectionsState.calm]: {
    label: 'Rustig',
    icon: 'crowd-calm',
    color: 'confirm',
  },
  [ElectionsState.medium]: {
    label: 'Gemiddeld',
    icon: 'crowd-medium',
    color: 'alert',
  },
  [ElectionsState.busy]: {
    label: 'Druk',
    icon: 'crowd-busy',
    color: 'warning',
  },
  [ElectionsState.unknown]: {
    label: 'Onbekend',
    icon: 'crowd-unknown',
    color: 'secondary',
  },
}
