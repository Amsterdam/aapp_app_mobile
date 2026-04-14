import {Screen} from '@/components/features/screen/Screen'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {KingsdayRouteName} from '@/modules/kingsday/routes'
import {ServicesGrid} from '@/modules/service/components/ServicesGrid'
import {ServiceModuleSource} from '@/modules/service/types'
import {Survey} from '@/modules/survey/exports/Survey'

export const KingsdayOverviewScreen = () => (
  <Screen
    keyboardAware
    testID="KingsdayOverviewScreen">
    <Box
      insetHorizontal="sm"
      insetVertical="md">
      <Column gutter="lg">
        <Box insetHorizontal="sm">
          <Column gutter="xl">
            <Paragraph variant="intro">
              Bekijk praktische informatie voor Koningsdag op de kaart.
            </Paragraph>
          </Column>
        </Box>
        <ServicesGrid
          detailsRouteName={KingsdayRouteName.details}
          source={ServiceModuleSource.kingsday}
        />
        <Box
          insetHorizontal="sm"
          insetVertical="no">
          <Column
            gutter="md"
            halign="start">
            <Title
              level="h3"
              text="Meer over Koningsdag in Amsterdam"
            />
            <Paragraph>
              Lees meer over veiligheid, verkeer, openbaar vervoer, varen, afval
              en evenementen tijdens Koningsdag. Bekijk alle informatie over
              Koningsdag
            </Paragraph>
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
