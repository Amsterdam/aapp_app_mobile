import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Track} from '@/components/ui/layout/Track'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {WasteContainerRouteName} from '@/modules/waste-container/routes'

type Props = NavigationProps<WasteContainerRouteName.wasteCardHelp>

export const WasteCardHelpScreen = ({navigation}: Props) => (
  <Screen testID="WasteCardHelpScreen">
    <Box
      insetHorizontal="md"
      insetTop="lg">
      <Track gutter="xl">
        <Column
          gutter="lg"
          shrink={1}>
          <Column gutter="sm">
            <Title
              level="h2"
              testID="WasteCardHelpScreenTitle"
              text="Volg deze stappen om het probleem op te lossen"
            />
            <List
              items={[
                'Controleer of bluetooth aanstaat',
                'Houd uw telefoon dichterbij de sensor in het gele vlak op de container',
              ]}
              testID="WasteCardHelpScreenList"
            />
          </Column>
          <Button
            label="Opnieuw container openen"
            onPress={() => navigation.popTo(WasteContainerRouteName.wasteCard)}
            testID="WasteCardHelpScreenButton"
          />
        </Column>
        <Column
          gutter="lg"
          shrink={1}>
          <Column gutter="sm">
            <Title
              level="h2"
              testID="WasteCardHelpScreenUnsolvedTitle"
              text="Probleem niet opgelost?"
            />
            <Paragraph testID="WasteCardHelpScreenUnsolvedParagraph">
              Gaat de container niet open of is de container vol? Laat het ons
              weten.
            </Paragraph>
          </Column>
          <Button
            label="Doe een melding"
            onPress={() =>
              navigation.navigate(ModuleSlug['report-problem'], {
                screen: ReportProblemRouteName.reportProblem,
              })
            }
            testID="WasteCardHelpScreenReportProblemButton"
            variant="secondary"
          />
        </Column>
      </Track>
    </Box>
  </Screen>
)
