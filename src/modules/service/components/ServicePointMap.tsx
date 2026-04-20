import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo, useState} from 'react'
import {Geojson, type Region} from 'react-native-maps'
import type {Service, ServiceFeature} from '@/modules/service/types'
import {MapBase} from '@/components/features/map/MapBase'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {MapFilters} from '@/components/features/map/filters/MapFilters'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {ControlVariant} from '@/components/features/map/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {ConditionType} from '@/modules/service/hooks/useGetFilteredFeatures'
import {useGetMapData} from '@/modules/service/hooks/useGetMapData'
import {useServiceQuery} from '@/modules/service/service'
import {ModuleSlug} from '@/modules/slugs'

export const ServicePointMap = ({
  id: serviceId,
  onServicePointPress,
}: {
  id: Service['id']
  onServicePointPress: (id: ServiceFeature['id']) => void
}) => {
  const [region, setRegion] = useState<Region | undefined>()

  const {
    data: service,
    isLoading,
    isError,
  } = useServiceQuery(serviceId || skipToken)
  const {data: geojson, icons_to_include: icons} = service || {}

  const [polygonGeoJson, pointsGeoJson] = useMemo(() => {
    if (typeof geojson !== 'object' || !('type' in geojson)) {
      return [undefined, undefined]
    }

    return [
      {
        ...geojson,
        features: geojson.features.filter(f => f.geometry.type !== 'Point'),
      },
      {
        ...geojson,
        features: geojson.features.filter(f => f.geometry.type === 'Point'),
      },
    ]
  }, [geojson])

  const {activeFilters, filters, onPressFilter, layers} = useMapFilters()

  const data = useGetMapData(
    activeFilters,
    pointsGeoJson,
    icons,
    onServicePointPress,
    layers?.length ? ConditionType.or : ConditionType.and,
  )

  if (isLoading) {
    return <PleaseWait testID="ServiceMapPleaseWait" />
  }

  return (
    <MapBase
      controls={[ControlVariant.location]}
      FilterComponent={
        <MapFilters
          activeFilters={activeFilters}
          filters={layers?.length ? layers : filters}
          onPressFilter={onPressFilter}
          testID="ServiceMapFilters"
        />
      }
      isError={isError}
      moduleSlug={ModuleSlug.service}
      onRegionChangeComplete={setRegion}>
      {!!polygonGeoJson?.features.length && (
        <Geojson
          geojson={polygonGeoJson}
          onPress={e => {
            if (e.feature.id !== undefined) {
              onServicePointPress(e.feature.id)
            }
          }}
          tappable
        />
      )}
      <Clusterer
        data={data}
        region={region}
        shouldGroup
      />
    </MapBase>
  )
}
