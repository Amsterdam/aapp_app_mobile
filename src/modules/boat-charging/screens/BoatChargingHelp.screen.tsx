import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {Screen} from '@/components/features/screen/Screen'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {PhoneHQButton} from '@/components/ui/buttons/PhoneHQButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ExternalInlineLink} from '@/components/ui/text/ExternalInlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {RedirectKey} from '@/modules/redirects/types'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {ModuleSlug} from '@/modules/slugs'

type Props = NavigationProps<BoatChargingRouteName.boatChargingHelp>

export const BoatChargingHelpScreen = ({navigation}: Props) => (
  <Screen testID="BoatChargingHelpScreen">
    <Box>
      <Column gutter="xl">
        <Column gutter="md">
          <Title
            level="h2"
            testID="BoatChargingHelpScreenTryFirstTitle"
            text="Probeer dit eerst"
          />
          <Paragraph>Volg deze stappen om het probleem op te lossen.</Paragraph>
          <List
            items={[
              'Controleer of u genoeg saldo op uw rekening heeft.',
              'Kies het juiste stopcontact in de app.',
              'Start eerst het opladen in de app en steek daarna de stekker in het stopcontact.',
              'Controleer of de stekker goed vast zit.',
            ]}
            testID="BoatChargingHelpList"
          />
          <ExternalInlineLink
            redirectKey={RedirectKey.boatChargingFAQ}
            testID="BoatChargingHelpScreenFAQButton">
            Bekijk de veelgestelde vragen
          </ExternalInlineLink>
        </Column>
        <Column gutter="md">
          <Title
            level="h2"
            testID="BoatChargingHelpScreenCallTitle"
            text="Bel voor hulp"
          />
          <Paragraph>
            Maandag tot en met vrijdag tussen 08.00 en 18.00 uur.
          </Paragraph>
          <PhoneHQButton
            testID="BoatChargingHelpScreenPhoneHQButton"
            variant="secondary"
          />
        </Column>
        <Column gutter="md">
          <Title
            level="h2"
            testID="BoatChargingHelpScreenReportProblemTitle"
            text="Probleem melden"
          />
          <Paragraph>Meld een storing of onjuiste informatie.</Paragraph>
          <NavigationButton
            chevronSize="md"
            emphasis="default"
            horizontallyAlign="start"
            insetHorizontal="no"
            onPress={() =>
              navigation.navigate(ModuleSlug['report-problem'], {
                screen: ReportProblemRouteName.reportProblemWebView,
              })
            }
            testID="BoatChargingHelpScreenReportProblemButton"
            title="Doe een melding"
          />
        </Column>
      </Column>
    </Box>
  </Screen>
)
