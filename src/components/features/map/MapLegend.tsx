import type {ComponentProps, ReactNode} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'

type LegendItem = {
  label?: string
} & (
  | {Icon?: never; icon: ComponentProps<typeof Icon>}
  | {Icon: ReactNode; icon?: never}
)

type LegendItemGroup = {
  items: LegendItem[]
  label?: string
}

type Props = {
  legendItemGroups: LegendItemGroup[]
  title?: string
}

export const MapLegend = ({title = 'Legenda', legendItemGroups}: Props) => {
  const autoFocus = useAccessibilityFocus()

  return (
    <Box
      insetBottom="md"
      insetHorizontal="md">
      <Column gutter="lg">
        <Title
          level="h3"
          ref={autoFocus}
          text={title}
        />

        {legendItemGroups.map(({label: groupLabel, items}, groupIndex) => (
          <Column
            gutter="sm"
            key={groupLabel || `legendGroup-${groupIndex + 1}`}>
            {!!groupLabel && (
              <Title
                level="h5"
                text={groupLabel}
              />
            )}
            {items.map(
              ({label: legendItemLabel, icon, Icon: CustomIcon}, itemIndex) => (
                <Row
                  gutter="sm"
                  key={legendItemLabel || `legendItem-${itemIndex + 1}`}>
                  {!!CustomIcon && CustomIcon}
                  {!!icon && (
                    <Icon
                      {...icon}
                      size="lg"
                    />
                  )}
                  <Phrase>{legendItemLabel}</Phrase>
                </Row>
              ),
            )}
          </Column>
        ))}
      </Column>
    </Box>
  )
}
