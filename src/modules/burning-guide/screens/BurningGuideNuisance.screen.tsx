import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {BurningGuideRouteName} from '@/modules/burning-guide/routes'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {RedirectKey} from '@/modules/redirects/types'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'

type Props = NavigationProps<BurningGuideRouteName.burningGuideNuisance>

export const BurningGuideNuisanceScreen = ({navigation: {navigate}}: Props) => (
  <Screen testID="BurningGuideNuisanceScreen">
    <Box>
      <Column gutter="xl">
        <Column gutter="lg">
          <Title text="Heeft u last van rook?" />
          <Paragraph variant="intro">
            U kunt overlast door houtstook melden bij het RIVM of bij de
            gemeente. Kies hieronder wat bij uw situatie past.
          </Paragraph>
        </Column>
        <Column gutter="lg">
          <Title
            level="h4"
            text="Rook van een huis, tuin of boot"
          />
          <Paragraph>
            Meld dit bij het RIVM, zodat zij een beter beeld krijgen van de
            overlast door hout stoken in Nederland.
          </Paragraph>
          <ExternalLinkButton
            label="Meld bij het RIVM"
            redirectKey={RedirectKey.rivm_report}
            testID="BurningGuideNuisanceReportRIVMButton"
            variant="secondary"
          />
        </Column>
        <Column gutter="lg">
          <Title
            level="h4"
            text="Rook op straat of in een park"
          />
          <Paragraph>
            Meld dit bij de gemeente. Wij onderzoeken wat er aan de hand is.
          </Paragraph>
          <Button
            label="Meld bij de gemeente"
            onPress={() =>
              navigate(ModuleSlug['report-problem'], {
                screen: ReportProblemRouteName.reportProblemWebView,
              })
            }
            testID="BurningGuideNuisanceReportProblemButton"
            variant="secondary"
          />
        </Column>
      </Column>
    </Box>
  </Screen>
)
