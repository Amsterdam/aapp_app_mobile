import type {ComponentProps, JSX, PropsWithChildren, ReactNode} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {IconSize} from '@/components/ui/types'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useDeviceContext} from '@/hooks/useDeviceContext'

type LegendItem = {
  label?: string
} & (
  | {Icon?: never; icon: ComponentProps<typeof Icon>}
  | {Icon: ReactNode; icon?: never}
)

export const MapLegend: ((
  props: PropsWithChildren<{title?: string}>,
) => JSX.Element) & {
  Category: typeof MapLegendItemCategory
  Item: typeof MapLegendItem
} = ({title = 'Legenda', children}: PropsWithChildren<{title?: string}>) => {
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

        {children}
      </Column>
    </Box>
  )
}

const MapLegendItemCategory = ({
  children,
  label,
}: PropsWithChildren<{label?: string}>) => (
  <Column gutter="sm">
    {!!label && (
      <Title
        level="h5"
        text={label}
      />
    )}
    {children}
  </Column>
)

const MapLegendItem = ({
  label,
  ...iconProps
}: LegendItem & {iconSize?: keyof typeof IconSize}) => (
  <Row gutter="smd">
    <MapLegendItemIcon {...iconProps} />

    <Phrase>{label}</Phrase>
  </Row>
)

const MapLegendItemIcon = ({
  icon,
  Icon: CustomIcon,
  iconSize = 'lg',
}: Partial<LegendItem> & {
  iconSize?: keyof typeof IconSize
}) => {
  const {fontScale} = useDeviceContext()

  if (!icon && !CustomIcon) {
    return null
  }

  const scaledSize = IconSize[iconSize] * fontScale

  return (
    <Size width={scaledSize}>
      <Column align="center">
        {!!CustomIcon && CustomIcon}
        {!!icon && (
          <Icon
            {...icon}
            size={icon.size || iconSize}
          />
        )}
      </Column>
    </Size>
  )
}

MapLegend.Category = MapLegendItemCategory
MapLegend.Item = MapLegendItem
