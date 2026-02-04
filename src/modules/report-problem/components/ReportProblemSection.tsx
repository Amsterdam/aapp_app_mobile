import {Button} from '@/components/ui/buttons/Button'
import {MoreInfoButton} from '@/components/ui/buttons/MoreInfoButton'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Track} from '@/components/ui/layout/Track'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ReportProblemSection = () => {
  const {open} = useBottomSheet()
  const {navigate} = useNavigation()

  return (
    <Column gutter="md">
      <Title
        testID="ReportProblemScreenTitle"
        text="Een melding doen"
      />
      <Track gutter="lg">
        <Column
          flex={2}
          gutter="md"
          halign="start">
          <Paragraph>
            Ziet u iets dat de gemeente moet opruimen of repareren? Doe een
            melding.
          </Paragraph>

          <MoreInfoButton
            accessibilityHint="Opent de lijst met onderwerpen waarover een melding kan worden gedaan"
            onPress={() => open()}
            testID="ReportProblemTypesMoreInfoButton"
            text="Dit kunt u melden"
          />
        </Column>
        <Column
          flex={1}
          gutter="md">
          <Row
            gutter="md"
            wrap>
            <Column grow={1}>
              <Button
                label="Melding doen"
                onPress={() =>
                  navigate(ReportProblemRouteName.reportProblemWebView)
                }
                testID="ReportProblemButton"
              />
            </Column>
          </Row>
        </Column>
      </Track>
    </Column>
  )
}
