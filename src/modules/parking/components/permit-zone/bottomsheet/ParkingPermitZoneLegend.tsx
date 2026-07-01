import {useMemo} from 'react'
import type {IconSize} from '@/components/ui/types'
import type {PermitZoneFeatureProperties} from '@/modules/parking/types'
import {
  MapLegend,
  type MapLegendItem,
} from '@/components/features/map/MapLegend'
import {ParkingPermitZoneLegendRect} from '@/modules/parking/components/permit-zone/ParkingPermitZoneLegendRect'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitZonesQuery} from '@/modules/parking/service'
import {getPermitZoneFeatureProperties} from '@/modules/parking/utils/getPermitZoneFeatureProperties'
import {hasEqualValues} from '@/utils/object'

const SIZE: keyof typeof IconSize = 'lgx'

const LEGEND_ITEMS: Array<MapLegendItem> = [
  {
    label: 'Parkeerautomaat of paal',
    icon: {name: 'marker-point', color: 'default', size: SIZE},
  },
  {
    label: 'Standaard parkeerautomaat',
    icon: {
      name: 'marker-distinct',
      color: 'link',
      size: SIZE,
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

    const dynamicItems = propertiesSet.map<MapLegendItem>(
      ({fill, popupContent}) => ({
        label: getPermitZoneFeatureProperties(fill)?.label || popupContent,
        Icon: (
          <ParkingPermitZoneLegendRect
            fill={fill}
            size="ml"
          />
        ),
      }),
    )

    return [...LEGEND_ITEMS, ...dynamicItems]
  }, [permitZoneData])

  return (
    <MapLegend>
      <MapLegend.Category>
        {items.map((item, index) => (
          <MapLegend.Item
            {...item}
            iconSize={SIZE}
            key={item.label || index}
          />
        ))}
      </MapLegend.Category>
    </MapLegend>
  )
}
