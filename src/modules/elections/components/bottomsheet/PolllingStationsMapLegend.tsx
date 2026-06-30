import type {ComponentProps} from 'react'
import {MapLegend} from '@/components/features/map/MapLegend'
import {crowdStateMap} from '@/modules/elections/constants/crowdDetails'
import {ElectionsState} from '@/modules/elections/types'

const LEGEND_ITEMS: Array<ComponentProps<typeof MapLegend.Item>> = [
  ElectionsState.calm,
  ElectionsState.medium,
  ElectionsState.busy,
  ElectionsState.unknown,
].map(state => ({
  label: crowdStateMap[state].label,
  icon: {name: crowdStateMap[state].icon, color: crowdStateMap[state].color},
}))

export const PollingStationsMapLegend = () => (
  <MapLegend title="Kaartlagen">
    <MapLegend.Category label="Drukte nu">
      {LEGEND_ITEMS.map((item, index) => (
        <MapLegend.Item
          {...item}
          key={item.label || index}
        />
      ))}
    </MapLegend.Category>
  </MapLegend>
)
