import type {ServiceItem} from '@/modules/service/types'
import {MapViewVariant} from '@/components/features/map/MapViewSwitchContext'
import {useMapViewSwitch} from '@/components/features/map/hooks/useMapViewSwitch'
import {ServicePointList} from '@/modules/service/components/ServicePointList'
import {ServicePointMap} from '@/modules/service/components/ServicePointMap'

export const ServicePointView = (props: {id: ServiceItem['id']}) => {
  const {viewType} = useMapViewSwitch()

  const ServiceViewComponent =
    viewType === MapViewVariant.map ? ServicePointMap : ServicePointList

  return <ServiceViewComponent {...props} />
}
