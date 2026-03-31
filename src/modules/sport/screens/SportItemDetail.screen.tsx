import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'
import {SportRouteName} from '@/modules/sport/routes'
import {useSportLocationsQuery} from '@/modules/sport/service'

type Props = NavigationProps<SportRouteName.sportItemDetail>

export const SportItemDetailScreen = ({route, navigation}: Props) => {
  const {detailName} = route.params
  const {data} = useSportLocationsQuery()
  const details = data?.find(location => location['detail-name'] === detailName)

  useSetScreenTitle(details?.naam)

  const directionsUrl = useGetGoogleMapsDirectionsUrl({
    lat: details?.geometry.coordinates[1],
    lon: details?.geometry.coordinates[0],
  })

  if (!details) {
    return (
      <SomethingWentWrong testID="SportItemDetailScreenSomethingWentWrong" />
    )
  }

  return (
    <Screen testID="SportItemDetailScreen">
      <Box>
        <Column gutter="lg">
          <LazyImage
            aspectRatio="wide"
            source={{uri: ''}}
            testID="SportItemDetailScreenLazyImage"
          />
          <Column gutter="xl">
            <Column gutter="lg">
              <Title
                level="h3"
                text="Kaartje kopen"
              />
              <Column gutter="sm">
                <NavigationButton
                  onPress={() => {
                    navigation.navigate(SportRouteName.ticketPurchase, {
                      detailName,
                      activity: 'Banenzwemmen',
                    })
                  }}
                  testID="1NavigationButton"
                  title="Banenzwemmen"
                />
                <NavigationButton
                  onPress={() => {
                    null
                  }}
                  testID="1NavigationButton"
                  title="Recreatiezwemmen"
                />
                <NavigationButton
                  onPress={() => {
                    null
                  }}
                  testID="1NavigationButton"
                  title="Baby-, peuter- en kleuterzwemmen"
                />
                <NavigationButton
                  onPress={() => {
                    null
                  }}
                  testID="1NavigationButton"
                  title="Aquasporten"
                />
                <NavigationButton
                  onPress={() => {
                    null
                  }}
                  testID="1NavigationButton"
                  title="Zwemles"
                />
              </Column>
            </Column>

            <Button
              label="Bekijk zwemtijden"
              testID="Button"
              variant="secondary"
            />

            <Column gutter="lg">
              <Title
                level="h3"
                text="Naar het zwembad"
              />

              <Paragraph>
                {details.adres} {'\n'}
                {details.postcode} {details.plaats}
              </Paragraph>

              {!!directionsUrl && (
                <ExternalLinkButton
                  label="Route Noorderparkbad"
                  testID="SportItemDetailScreenExternalLinkButton"
                  url={directionsUrl}
                  variant="secondary"
                />
              )}
            </Column>
          </Column>
        </Column>
      </Box>
    </Screen>
  )
}
