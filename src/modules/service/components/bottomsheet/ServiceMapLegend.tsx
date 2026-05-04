import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import type {Service} from '@/modules/service/types'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {ServicePointCustomIcon} from '@/modules/service/components/ServicePointCustomIcon'
import {useServiceQuery} from '@/modules/service/service'
import {getLegendEntryTitle} from '@/modules/service/utils/getLegendEntryTitle'

export const ServiceMapLegend = ({id: serviceId}: {id: Service['id']}) => {
  const {close: closeBottomSheet} = useBottomSheet()
  const autoFocus = useAccessibilityFocus()

  const {data: service} = useServiceQuery(serviceId || skipToken)
  const {icons_to_include, data} = service || {}

  const entries = useMemo(() => {
    if (!data || !('type' in data) || !icons_to_include) return []

    return Object.entries(icons_to_include).map(([key, icon]) => {
      const entry = data.features.find(
        feature => feature.properties.aapp_icon_type === key,
      )

      return {
        ...icon,
        title: getLegendEntryTitle(entry?.properties),
      }
    })
  }, [data, icons_to_include])

  return (
    <Box>
      <Column gutter="lg">
        <Row align="between">
          <Title
            level="h3"
            ref={autoFocus}
            text="Legenda"
          />
          <IconButton
            accessibilityLabel="Sluit legenda venster"
            icon={
              <Icon
                name="close"
                size="ml"
              />
            }
            onPress={closeBottomSheet}
            testID="ServiceMapLegendCloseButton"
          />
        </Row>
        <Column gutter="sm">
          {entries.map(({title, ...icon}) => (
            <Row
              gutter="smd"
              key={title}>
              <ServicePointCustomIcon
                icon={icon}
                testID="ServiceMapLegendServicePointCustomIcon"
              />
              <Phrase>{title}</Phrase>
            </Row>
          ))}
        </Column>
      </Column>
    </Box>
  )
}
