import type {TestProps} from '@/components/ui/types'
import type {Coordinates} from '@/types/location'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'

type Props = {
  accessibilityLabel?: string
  coordinates: Partial<Coordinates>
} & TestProps

export const RouteButton = ({
  testID,
  coordinates,
  accessibilityLabel = 'Open de route op de routeplanner van uw telefoon.',
}: Props) => {
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
