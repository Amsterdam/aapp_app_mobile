import {useMemo, type ComponentProps} from 'react'
import type {PermitZoneFeatureProperties} from '@/modules/parking/types'
import {MapLegend} from '@/components/features/map/MapLegend'
import {ParkingPermitZoneLegendRect} from '@/modules/parking/components/permit-zone/ParkingPermitZoneLegendRect'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitZonesQuery} from '@/modules/parking/service'
import {getPermitZoneFeatureProperties} from '@/modules/parking/utils/getPermitZoneFeatureProperties'
import {hasEqualValues} from '@/utils/object'

type LegendItem = ComponentProps<
  typeof MapLegend
>['legendItemGroups'][number]['items'][number]

const LEGEND_ITEMS: Array<LegendItem> = [
  {
    label: 'Parkeerautomaat of paal',
    icon: {name: 'marker-point', color: 'default'},
  },
  {
    label: 'Standaard parkeerautomaat',
    icon: {
      name: 'marker-distinct',
      color: 'link',
    },
  },
]

export const ParkingPermitZoneLegend = () => {
  const {report_code} = useCurrentParkingPermit()

  const {data: permitZoneData} = usePermitZonesQuery(report_code)

  const items = useMemo(() => {
    if (!permitZoneData || !('features' in permitZoneData.geojson)) {
      return LEGEND_ITEMS
    }

    const propertiesSet = permitZoneData.geojson.features.reduce<
      PermitZoneFeatureProperties[]
    >((set, current) => {
      if (
        set.some(property =>
          hasEqualValues(property, current.properties, 'popupContent'),
        )
      ) {
        return set
      }

      return [...set, current.properties]
    }, [])

    const dynamicItems = propertiesSet.map<LegendItem>(
      ({fill, popupContent}) => ({
        label: getPermitZoneFeatureProperties(fill)?.label || popupContent,
        Icon: <ParkingPermitZoneLegendRect fill={fill} />,
      }),
    )

    return [...LEGEND_ITEMS, ...dynamicItems]
  }, [permitZoneData])

  return (
    <MapLegend
      legendItemGroups={[{items}]}
      title="Legenda"
    />
  )
}
