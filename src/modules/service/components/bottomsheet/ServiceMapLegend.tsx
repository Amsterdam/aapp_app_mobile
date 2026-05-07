import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import type {Service, ServiceFeature} from '@/modules/service/types'
import {MapLegend} from '@/components/features/map/MapLegend'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ServicePointCustomIcon} from '@/modules/service/components/ServicePointCustomIcon'
import {useServiceQuery} from '@/modules/service/service'
import {getLegendEntryLabel} from '@/modules/service/utils/getLegendEntryLabel'

export const ServiceMapLegend = ({id: serviceId}: {id: Service['id']}) => {
  const {
    data: service,
    isLoading,
    isError,
  } = useServiceQuery(serviceId || skipToken)

  const entries = useMemo(() => {
    const {icons_to_include, data} = service || {}

    if (!data || !('type' in data) || !icons_to_include) return []

    const featuresByIconType = data.features.reduce<
      Record<string, ServiceFeature>
    >((acc, feature) => {
      const iconType = feature.properties.aapp_icon_type

      if (iconType && !acc[iconType]) {
        acc[iconType] = feature
      }

      return acc
    }, {})

    return Object.entries(icons_to_include).map(([key, icon]) => {
      const entry = featuresByIconType[key]

      return {
        label: getLegendEntryLabel(entry?.properties),
        Icon: (
          <ServicePointCustomIcon
            icon={icon}
            testID="ServiceMapLegendServicePointCustomIcon"
          />
        ),
      }
    })
  }, [service])

  if (isError) {
    return (
      <Box>
        <SomethingWentWrong testID="ServiceMapLegendSomethingWentWrong" />
      </Box>
    )
  }

  if (isLoading) {
    return <PleaseWait testID="ServiceMapLegendPleaseWait" />
  }

  return (
    <MapLegend
      legendItemGroups={[
        {
          items: entries,
        },
      ]}
      title="Legenda"
    />
  )
}
