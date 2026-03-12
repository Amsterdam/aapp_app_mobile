import type {TestProps} from '@/components/ui/types'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'

const ROUTE_ICON_LINE_HEIGHT_CORRECTION = 4

type RouteButtonProps = {
  accessibilityLabel?: string
  directionsUrl: string
} & TestProps

export const RouteButton = ({
  testID,
  directionsUrl,
  accessibilityLabel = 'Open de route op de routeplanner van uw telefoon.',
}: RouteButtonProps) => (
  <ExternalLinkButton
    accessibilityLabel={accessibilityLabel}
    alignSelf="flex-start"
    icon={{name: 'navigate', size: 'ml'}}
    label="Route"
    lineHeightCorrection={ROUTE_ICON_LINE_HEIGHT_CORRECTION}
    noPadding
    testID={testID}
    url={directionsUrl}
    variant="tertiary"
  />
)
