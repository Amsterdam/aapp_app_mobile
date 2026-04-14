import {Screen} from '@/components/features/screen/Screen'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {KingsdayRouteName} from '@/modules/kingsday/routes'
import {ServicesGrid} from '@/modules/service/components/ServicesGrid'
import {Survey} from '@/modules/survey/exports/Survey'

export const KingsdayOverviewScreen = () => (
  <Screen
    keyboardAware
    testID="KingsdayOverviewScreen">
    <Box
      insetHorizontal="sm"
      insetVertical="md">
      <Column gutter="sm">
        <Box insetHorizontal="sm">
          <Column gutter="xl">
            <Paragraph variant="intro">
              27 april viert Amsterdam Koningsdag met festiviteiten in en rond
              de stad.
            </Paragraph>

            <Title
              level="h3"
              text="Koningsdag op de kaart"
            />
          </Column>
        </Box>
        <ServicesGrid detailsRouteName={KingsdayRouteName.details} />
        <Box
          insetHorizontal="sm"
          insetVertical="no">
          <Column
            gutter="md"
            halign="start">
            <ExternalLinkButton
              label="Meer informatie over koningsdag"
              noPadding
              testID="KingsdayMoreInfoButton"
              url="https://toegankelijkheidsverklaring.nl/register/13502"
              variant="tertiary"
            />
          </Column>
        </Box>
      </Column>
    </Box>
    <Survey entryPoint="kingsday-overview-info" />
  </Screen>
)
