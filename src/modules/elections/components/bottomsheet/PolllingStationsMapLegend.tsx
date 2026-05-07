import type {ComponentProps} from 'react'
import {MapLegend} from '@/components/features/map/MapLegend'

import {crowdStateMap} from '@/modules/elections/constants/crowdDetails'
import {ElectionsState} from '@/modules/elections/types'

const LEGEND_ITEMS = [
  ElectionsState.calm,
  ElectionsState.medium,
  ElectionsState.busy,
  ElectionsState.unknown,
].map(state => ({
  label: crowdStateMap[state].label,
  icon: {name: crowdStateMap[state].icon, color: crowdStateMap[state].color},
})) satisfies ComponentProps<
  typeof MapLegend
>['legendItemGroups'][number]['items']

export const PollingStationsMapLegend = () => (
  <MapLegend
    legendItemGroups={[{label: 'Drukte nu', items: LEGEND_ITEMS}]}
    title="Kaartlagen"
  />
)
