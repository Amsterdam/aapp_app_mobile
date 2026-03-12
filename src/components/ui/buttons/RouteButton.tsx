import type {TestProps} from '@/components/ui/types'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'

const ROUTE_ICON_LINE_HEIGHT_CORRECTION = 4

type RouteButtonProps = {
  accessibilityLabel?: string
  coordinates: {lat?: number; lon?: number}
} & TestProps

export const RouteButton = ({
  testID,
  coordinates,
  accessibilityLabel = 'Open de route op de routeplanner van uw telefoon.',
}: RouteButtonProps) => {
  const directionsUrl = useGetGoogleMapsDirectionsUrl(coordinates)

  if (!directionsUrl) {
    return null
  }

  return (
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
}
