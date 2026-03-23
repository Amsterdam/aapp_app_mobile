import type {TestProps} from '@/components/ui/types'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'

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
      noPadding
      testID={testID}
      url={directionsUrl}
      variant="tertiary"
    />
  )
}
