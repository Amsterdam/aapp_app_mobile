import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {MyReportsSection} from '@/modules/report-problem/components/MyReportsSection'
import {ReportMapSection} from '@/modules/report-problem/components/ReportMapSection'
import {ReportProblemSection} from '@/modules/report-problem/components/ReportProblemSection'
import {ReportProblemTypesBottomSheetContent} from '@/modules/report-problem/components/ReportProblemTypesBottomSheetContent'

export const ReportProblemScreen = () => (
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
        <ReportProblemSection />

        <ReportMapSection />

        <MyReportsSection />
      </Column>
    </Box>
  </Screen>
)
