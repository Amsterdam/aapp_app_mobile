import {pascalCase} from 'pascal-case'
import type {ComponentProps} from 'react'
import {MapLegend} from '@/components/features/map/MapLegend'
import {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {BoatChargingPointState} from '@/modules/boat-charging/types'

const ITEMS = [
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
})) satisfies ComponentProps<
  typeof MapLegend
>['legendItemGroups'][number]['items']

const MAP_LEGEND_ITEMS = [{items: ITEMS}]

export const BoatChargingMapLegend = () => (
  <MapLegend legendItemGroups={MAP_LEGEND_ITEMS} />
)
