import {pascalCase} from 'pascal-case'
import type {ComponentProps} from 'react'
import {MapLegend} from '@/components/features/map/MapLegend'
import {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {BoatChargingPointState} from '@/modules/boat-charging/types'

const ITEMS: Array<ComponentProps<typeof MapLegend.Item>> = [
  BoatChargingPointState.free,
  BoatChargingPointState.occupied,
  BoatChargingPointState.malfunction,
].map(state => ({
  label: boatChargingPointStateMap[state].label,
  Icon: (
    <CustomMarkerIcon
      icon={boatChargingPointStateMap[state].icon}
      testID={`BoatChargingMapLegend${pascalCase(state)}MarkerIcon`}
    />
  ),
}))

export const BoatChargingMapLegend = () => (
  <MapLegend>
    <MapLegend.Category>
      {ITEMS.map((item, index) => (
        <MapLegend.Item
          {...item}
          key={item.label || index}
        />
      ))}
    </MapLegend.Category>
  </MapLegend>
)
