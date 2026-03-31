import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ServiceRouteName} from '@/modules/service/routes'
import {ModuleSlug} from '@/modules/slugs'
import {SportRouteName} from '@/modules/sport/routes'
import {useSportLocationsQuery} from '@/modules/sport/service'

export const SportsCategoryList = () => {
  const {navigate} = useNavigation()
  const {data, isLoading, isError} = useSportLocationsQuery()

  if (isLoading) {
    return <PleaseWait testID="SportsCategoryListPleaseWait" />
  }

  if (!data || isError) {
    return <SomethingWentWrong testID="SportsCategoryListSomethingWentWrong" />
  }

  return (
    <Box>
      <Column gutter="lg">
        <Title
          level="h3"
          text="Kies een zwembad"
        />
        <Column gutter="sm">
          {data.map(sportLocation => (
            <Pressable
              flex={1}
              key={sportLocation.id}
              onPress={() =>
                navigate(SportRouteName.sportItemDetail, {
                  detailName: sportLocation['detail-name'],
                })
              }
              testID={`SportsCategoryList${sportLocation.id}Item`}>
              <Row gutter="md">
                <LazyImage
                  aspectRatio="narrow"
                  source={{uri: ''}}
                  testID="SportsCategoryListItemImage"
                />
                <Phrase>{sportLocation.naam}</Phrase>
              </Row>
            </Pressable>
          ))}
        </Column>

        <Gutter height="no" />
        <Button
          icon={{
            name: 'map',
          }}
          label="Zwembaden op kaart"
          onPress={() =>
            navigate(ModuleSlug.service, {
              screen: ServiceRouteName.map,
              params: {
                id: '3',
                title: 'Zwemwater',
              },
            })
          }
          testID="SportsCategoryListMapButton"
          variant="secondary"
        />
        <Gutter height="no" />

        <Column gutter="lg">
          <Title
            level="h3"
            text="Alles over zwemmen"
          />
          <Paragraph>
            Op de website vindt u meer informatie, zoals schoolzwemmen en
            aangepast zwemmen.
          </Paragraph>

          <ExternalLinkButton
            label="Lees meer over zwemmen"
            testID="SportsCategoryListExternalLinkButton"
            url="https://www.amsterdam.nl/sport/zwemmen-in-amsterdam/"
            variant="secondary"
          />
        </Column>
      </Column>
    </Box>
  )
}
