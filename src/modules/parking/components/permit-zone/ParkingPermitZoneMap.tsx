import {useMemo} from 'react'
import {MapBase} from '@/components/features/map/MapBase'
import {Polygons} from '@/components/features/map/polygon/Polygons'
import {ControlVariant, MapFocus} from '@/components/features/map/types'
import {getAllPolygonCoords} from '@/components/features/map/utils/getAllPolygonCoords'
import {getRegionFromCoords} from '@/components/features/map/utils/getRegionFromCoords'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {ParkingPermitZoneMapMarkers} from '@/modules/parking/components/permit-zone/ParkingPermitZoneMapMarkers'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'
import {usePermitZonesQuery} from '@/modules/parking/service'
import {getPermitZoneFeatureProperties} from '@/modules/parking/utils/getPermitZoneFeatureProperties'
import {debounce} from '@/utils/debounce'

const DEBOUNCE_DELAY = 100

export const ParkingPermitZoneMap = ({focusType}: {focusType: MapFocus}) => {
  const {report_code, can_select_zone} = useCurrentParkingPermit()
  const {setRegion} = usePermitMapContext()

  const {
    data: permitZoneData,
    isLoading,
    isError,
    startedTimeStamp,
  } = usePermitZonesQuery(report_code)

  const initialRegion = useMemo(() => {
    if (!permitZoneData?.geojson || !('features' in permitZoneData.geojson)) {
      return
    }

    const allCoords = getAllPolygonCoords(permitZoneData.geojson)

    return getRegionFromCoords(allCoords)
  }, [permitZoneData])

  if (isLoading) {
    return (
      <PleaseWait
        startedTimeStamp={startedTimeStamp}
        testID="ParkingPermitZoneMapPleaseWait"
      />
    )
  }

  if (
    !isError ||
    !permitZoneData?.geojson ||
    !('features' in permitZoneData.geojson) ||
    Object.keys(permitZoneData.geojson).length === 0
  ) {
    return (
      <SomethingWentWrong
        inset="md"
        testID="ParkingPermitZoneMapSomethingWentWrong"
      />
    )
  }

  return (
    <MapBase
      controls={[ControlVariant.location, ControlVariant.legend]}
      focusType={focusType}
      initialRegion={initialRegion}
      moduleSlug={ModuleSlug.parking}
      onRegionChange={debounce(setRegion, DEBOUNCE_DELAY)}>
      <Polygons
        data={permitZoneData.geojson.features.map(feature => ({
          ...feature,
          properties: {
            ...feature.properties,
            ...getPermitZoneFeatureProperties(feature.properties.fill),
          },
        }))}
      />
      {!!can_select_zone && <ParkingPermitZoneMapMarkers />}
    </MapBase>
  )
}
