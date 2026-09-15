import type {PropsWithChildren} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {ContentButton} from '@/components/ui/buttons/ContentButton'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {AlertInline} from '@/components/ui/feedback/alert/AlertInline'
import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressRouteName} from '@/modules/address/routes'
import {useMyAddress} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {NeighborhoodBoardItem} from '@/modules/neighborhood/components/NeighborhoodBoardItem'
import {NeighborhoodRouteName} from '@/modules/neighborhood/routes'
import {useGetNeighborhoodNotesQuery} from '@/modules/neighborhood/service'

export const NeighborhoodOverviewScreen = () => {
  const navigation = useNavigation()

  return (
    <Screen
      scroll
      testID="NeighborhoodOverviewScreen"
      withBottomInset={false}>
      <Box>
        <Paragraph color="secondary">
          Binnen 500 meter vanaf{' '}
          <InlineLink
            onPress={() =>
              navigation.navigate(ModuleSlug.address, {
                screen: AddressRouteName.chooseAddress,
                params: {
                  moduleSlug: ModuleSlug.neighborhood,
                },
              })
            }
            testID="NeighborhoodOverviewScreenInlineLink">
            Mijn adres
          </InlineLink>
        </Paragraph>
      </Box>

      <Column gutter="lg">
        <Section>
          <Section.Title
            onPress={() => navigation.navigate(NeighborhoodRouteName.board)}
            title="Agenda"
          />
          <ContentButton
            icon={{name: 'calendar'}}
            insetHorizontal="no"
            meta="Vandaag, 10:30 - 14:30 uur"
            onPress={() => null}
            testID="ContentButton"
            title="Leer en Werk Event Nieuw-West: kansen voor iedereen"
          />
        </Section>

        <Section>
          <Section.Title
            onPress={() => navigation.navigate(NeighborhoodRouteName.board)}
            title="Veranderingen in de buurt"
          />
          <ContentButton
            icon={{name: 'warning'}}
            insetHorizontal="no"
            meta="10 september"
            onPress={() => null}
            testID="ContentButton"
            title="Van bedrijventerrein naar wonen en werken"
          />
        </Section>

        <Section>
          <Section.Title
            onPress={() => navigation.navigate(NeighborhoodRouteName.board)}
            title="Buurtprikbord"
          />
          <NeighborhoodBoardSection />
        </Section>
      </Column>
    </Screen>
  )
}

const Section = ({children}: PropsWithChildren) => (
  <Column gutter="sm">{children}</Column>
)
const SectionList = ({children}: PropsWithChildren) => (
  <Column gutter="md">{children}</Column>
)
const SectionListItem = () => null

type SectionNavigationButtonProps = {onPress: () => void; title: string}
const SectionNavigationButton = ({
  onPress,
  title,
}: SectionNavigationButtonProps) => (
  <Box insetHorizontal="md">
    <NavigationButton
      chevronColor="default"
      chevronSize="ml"
      color="default"
      horizontallyAlign="start"
      insetHorizontal="no"
      onPress={onPress}
      testID="NeighborhoodOverviewScreenBoardNavigationButton"
      title={title}
      titleLevel="h3"
    />
  </Box>
)

Section.Title = SectionNavigationButton
Section.List = SectionList
Section.ListItem = SectionListItem

const NeighborhoodBoardSection = () => {
  const myAddress = useMyAddress()

  const {
    data: boardItems,
    isLoading,
    isError,
  } = useGetNeighborhoodNotesQuery({lat: 52.372, lng: 4.966})

  if (!myAddress?.postcode) {
    return (
      <AlertInline
        navigateTo={{
          label: 'Mijn adres',
          type: 'navigate',
          params: [
            ModuleSlug.address,
            {
              screen: AddressRouteName.chooseAddress,
              params: {moduleSlug: ModuleSlug.neighborhood},
            },
          ],
        }}
        testID="NeighborhoodBoardSectionAlert"
        text="We gebruiken uw adres om het prikbord van uw buurt op te halen."
        title="Voer uw adres in"
        variant={AlertVariant.warning}
      />
    )
  }

  if (isLoading) {
    return (
      <PleaseWait
        showFeedback
        testID="NeighborhoodBoardScreenPleaseWait"
      />
    )
  }

  if (isError || !boardItems) {
    return (
      <Box insetHorizontal="md">
        <SomethingWentWrong testID="NeighborhoodBoardScreenSomethingWentWrong" />
      </Box>
    )
  }

  return boardItems.map(item => (
    <NeighborhoodBoardItem
      key={item.id}
      {...item}
    />
  ))
}
