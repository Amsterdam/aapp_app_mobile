import {Screen} from '@/components/features/screen/Screen'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {PrideRouteName} from '@/modules/pride/routes'
import {RedirectKey} from '@/modules/redirects/types'
import {ServicesGrid} from '@/modules/service/components/ServicesGrid'
import {ServiceModuleSource} from '@/modules/service/types'
import {Survey} from '@/modules/survey/exports/Survey'

export const PrideOverviewScreen = () => (
  <Screen
    keyboardAware
    testID="PrideOverviewScreen">
    <Box
      insetHorizontal="sm"
      insetVertical="md">
      <Column gutter="lg">
        <ServicesGrid
          colorScheme={['pride', 'default']}
          detailsRouteName={PrideRouteName.details}
          source={ServiceModuleSource.pride}
        />
        <Box
          insetHorizontal="sm"
          insetVertical="no">
          <Column gutter="xl">
            <Column
              gutter="md"
              halign="start">
              <Title
                level="h3"
                text="Maand vol evenementen"
              />
              <Paragraph>
                Bekijk alle evenementen, exposities, feestjes en activiteiten in
                de Uitagenda van I amsterdam.
              </Paragraph>
              <ExternalLinkButton
                label="Bekijk WorldPride in de Uitagenda"
                noPadding
                redirectKey={RedirectKey.worldPrideEvents}
                testID="PrideEventsButton"
                variant="tertiary"
              />
            </Column>
            <Column
              gutter="md"
              halign="start">
              <Title
                level="h3"
                text="Praktische informatie over Pride"
              />
              <Paragraph>
                Lees wat u moet weten over openbaar vervoer, veiligheid,
                verkeersmaatregelen en varen tijdens Pride.
              </Paragraph>
              <ExternalLinkButton
                label="Bekijk praktische informatie"
                noPadding
                redirectKey={RedirectKey.worldPridePracticalInfo}
                testID="PridePracticalInfoButton"
                variant="tertiary"
              />
            </Column>
          </Column>
        </Box>
      </Column>
    </Box>
    <Survey entryPoint="pride-overview-info" />
  </Screen>
)
