import {View} from 'react-native'
import {NavigationProps} from '@/app/navigation/types'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Track} from '@/components/ui/layout/Track'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ReportProblemTypesBottomSheetContent} from '@/modules/report-problem/components/ReportProblemTypesBottomSheetContent'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {devLog} from '@/processes/development'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = NavigationProps<ReportProblemRouteName.reportProblem>

export const ReportProblemScreen = ({navigation}: Props) => {
  const {open} = useBottomSheet()

  return (
    <Screen
      bottomSheet={
        <BottomSheet
          scroll
          testID="ReportProblemScreenProblemTypesBottomSheet">
          <ReportProblemTypesBottomSheetContent />
        </BottomSheet>
      }
      testID="ReportProblemScreen">
      <Box>
        <Column gutter="xl">
          <Column gutter="md">
            <Title
              testID="ReportProblemScreenTitle"
              text="Een melding doen"
            />
            <Track gutter="lg">
              <Column
                flex={2}
                gutter="md">
                <Paragraph>
                  Ziet u iets dat de gemeente moet opruimen of repareren? Doe
                  een melding.
                </Paragraph>

                <View style={{alignSelf: 'baseline'}}>
                  <Pressable
                    onPress={() => open()}
                    testID={'Link'}>
                    <Row valign="center">
                      <Phrase color="link">Dit kunt u melden </Phrase>
                      <Icon
                        color="link"
                        name="chevron-down"
                      />
                    </Row>
                  </Pressable>
                </View>
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
                        navigation.navigate(
                          ReportProblemRouteName.reportProblemWebView,
                        )
                      }
                      testID="ReportProblemButton"
                    />
                  </Column>
                </Row>
              </Column>
            </Track>
          </Column>

          <Column gutter="md">
            <Title
              level="h2"
              testID="ReportProblemScreenTitle"
              text="Meldingenkaart"
            />
            <Track gutter="lg">
              <Column
                flex={2}
                gutter="md">
                <Paragraph>
                  Bekijk eerst de meldingenkaart om te zien welke meldingen al
                  bekend zijn bij de gemeente.
                </Paragraph>
              </Column>
              <Column
                flex={1}
                gutter="md">
                <Row
                  gutter="md"
                  wrap>
                  <Column grow={1}>
                    <ExternalLinkButton
                      label="Meldingenkaart"
                      onPress={() => devLog('link naar kaart')}
                      testID="ReportProblemButton"
                      variant="secondary"
                    />
                  </Column>
                </Row>
              </Column>
            </Track>
          </Column>

          <Column gutter="md">
            <Title
              level="h2"
              testID="ReportProblemScreenTitle"
              text="Melding volgen"
            />
            <Track gutter="lg">
              <Column
                flex={2}
                gutter="md">
                <Paragraph>
                  U kunt uw melding volgen via Mijn meldingen.
                </Paragraph>
              </Column>
              <Column
                flex={1}
                gutter="md">
                <Row
                  gutter="md"
                  wrap>
                  <Column grow={1}>
                    <ExternalLinkButton
                      label="Mijn meldingen"
                      onPress={() => devLog('link naar mijn meldingen')}
                      testID="ReportProblemButton"
                      variant="secondary"
                    />
                  </Column>
                </Row>
              </Column>
            </Track>
          </Column>
        </Column>
      </Box>
    </Screen>
  )
}
