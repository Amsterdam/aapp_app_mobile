import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import type {Service, ServiceFeature} from '@/modules/service/types'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {ServicePointCustomIcon} from '@/modules/service/components/ServicePointCustomIcon'
import {useServiceQuery} from '@/modules/service/service'
import {getLegendEntryLabel} from '@/modules/service/utils/getLegendEntryLabel'

export const ServiceMapLegend = ({id: serviceId}: {id: Service['id']}) => {
  const autoFocus = useAccessibilityFocus()

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
        key,
        icon,
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
    <Box
      insetBottom="md"
      insetHorizontal="md">
      <Column gutter="lg">
        <Title
          level="h3"
          ref={autoFocus}
          text="Legenda"
        />

        <Column gutter="sm">
          {entries.map(({label, key, icon}) => (
            <Row
              gutter="smd"
              key={key}>
              <ServicePointCustomIcon
                icon={icon}
                testID="ServiceMapLegendServicePointCustomIcon"
              />
              <Phrase>{label}</Phrase>
            </Row>
          ))}
        </Column>
      </Column>
    </Box>
  )
}
