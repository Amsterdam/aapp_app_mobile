import {useMemo} from 'react'
import type {NavigationProps} from '@/app/navigation/types'
import type {PrideRouteName} from '@/modules/pride/routes'
import {Screen} from '@/components/features/screen/Screen'
import {RouteButton} from '@/components/ui/buttons/RouteButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ExternalInlineLink} from '@/components/ui/text/ExternalInlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {usePrideEvents} from '@/modules/pride/hooks/usePrideEvents'
import {formatMeta} from '@/modules/pride/utils/formatMeta'

type Props = NavigationProps<PrideRouteName.eventDetails>

export const PrideEventDetailsScreen = ({route}: Props) => {
  const {getEvent, isLoading, isError} = usePrideEvents()

  const event = useMemo(
    () => getEvent(route.params.id),
    [getEvent, route.params.id],
  )

  if (isLoading) {
    return <PleaseWait testID="PrideEventDetailsScreenPleaseWait" />
  }

  if (!event || isError) {
    return (
      <SomethingWentWrong testID="PrideEventDetailsScreenSomethingWentWrong" />
    )
  }

  const {title, type, address, website, date_start, date_end, time} = event

  return (
    <Screen testID="PrideEventDetailsScreen">
      <Box>
        <Column gutter="lg">
          <Column>
            <Title
              level="h2"
              text={title}
            />
            <Phrase>{type}</Phrase>
          </Column>

          {!!event.date_start && (
            <Row
              gutter="sm"
              valign="start">
              <Column>
                <Gutter height="xs" />
                <Icon
                  name="clock"
                  size="lg"
                />
              </Column>
              <Column
                grow={1}
                shrink={1}>
                <Phrase emphasis="strong">Wanneer</Phrase>
                <Phrase>{formatMeta({date_start, date_end, time})}</Phrase>
              </Column>
            </Row>
          )}

          <Row
            gutter="sm"
            valign="start">
            <Column>
              <Gutter height="xs" />
              <Icon
                name="map-marker"
                size="lg"
              />
            </Column>
            <Column
              grow={1}
              shrink={1}>
              <Phrase emphasis="strong">Locatie</Phrase>
              <Phrase>
                {address.street} {address.number}
              </Phrase>
              <Phrase>{address.city}</Phrase>
              {!!address.coordinates && (
                <RouteButton
                  coordinates={address.coordinates}
                  testID="PrideEventDetailsScreenRouteButton"
                />
              )}
            </Column>
          </Row>

          {!!website && (
            <ExternalInlineLink
              testID="PrideEventDetailsScreenExternalInlineLink"
              url={website}>
              Meer informatie
            </ExternalInlineLink>
          )}
        </Column>
      </Box>
    </Screen>
  )
}
