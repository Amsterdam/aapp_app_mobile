import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'
import {PollingStationDetailsCategories} from '@/modules/elections/components/PollingStationDetailsCategories'
import {usePollingStationsQuery} from '@/modules/elections/service'
import {useSelectedPollingStationId} from '@/modules/elections/slice'
import {getOpeningTimes} from '@/modules/elections/utils/getOpeningTimes'
import {RedirectKey} from '@/modules/redirects/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const PollingStationDetails = () => {
  const {close: closeBottomSheet} = useBottomSheet()
  const pollingStationId = useSelectedPollingStationId()
  const {data} = usePollingStationsQuery()
  const pollingStation = data?.find(station => station.id === pollingStationId)
  const {lat, lng} = pollingStation?.position || {}
  const directionsUrl = useGetGoogleMapsDirectionsUrl({lat, lon: lng})

  if (!pollingStation) {
    return null
  }

  return (
    <Box>
      <Column gutter="lg">
        <Row align="between">
          <Title
            level="h3"
            text={pollingStation?.name}
          />
          <IconButton
            accessibilityLabel="Sluit stembureau details venster"
            icon={
              <Icon
                name="close"
                size="ml"
              />
            }
            onPress={closeBottomSheet}
            testID="PollingStationDetailsCloseButton"
          />
        </Row>
        <Row
          gutter="md"
          valign="start">
          <Box insetTop="xs">
            <Icon
              name="clock"
              size="lg"
            />
          </Box>
          <Column>
            <Title
              level="h5"
              text="Openingstijden"
            />
            <Paragraph>
              {getOpeningTimes(pollingStation.openingTimes)}
            </Paragraph>
          </Column>
        </Row>
        <Row
          gutter="md"
          valign="start">
          <Box insetTop="xs">
            <Icon
              name="location"
              size="lg"
            />
          </Box>
          <Column halign="start">
            <Title
              level="h5"
              text="Adres"
            />
            <Paragraph>{pollingStation.address1}</Paragraph>
            <ExternalLinkButton
              label="Route openen"
              noPadding
              testID="PollingStationDetailsRouteExternalLinkButton"
              url={directionsUrl}
              variant="tertiary"
            />
          </Column>
        </Row>
        {!!pollingStation.categories.length && (
          <PollingStationDetailsCategories
            categories={pollingStation.categories}
          />
        )}
        <Row align="start">
          <ExternalLinkButton
            label="Meer informatie over de verkiezingen"
            noPadding
            redirectKey={RedirectKey.elections}
            testID="PollingStationDetailsElectionsExternalLinkButton"
            variant="tertiary"
          />
        </Row>
      </Column>
    </Box>
  )
}
