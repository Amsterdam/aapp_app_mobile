import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {EnvironmentSelector} from '@/modules/home/components/EnvironmentSelector'
import {HomeAdminTestButtons} from '@/modules/home/components/admin/HomeAdminTestButtons'
import {BottomSheetSurvey} from '@/modules/survey/exports/BottomSheetSurvey'
import {isDevApp} from '@/processes/development'
import {VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

export const AdminScreen = () => (
  <Screen
    bottomSheet={<BottomSheetSurvey testID="AdminScreenBottomSheet" />}
    hasStickyAlert
    headerOptions={{disableHorizontalInsets: true}}
    keyboardAware
    testID="HomeTestAdminScreen">
    {!!isDevApp && (
      <>
        <Column
          grow={1}
          gutter="xl">
          <EnvironmentSelector />
          <Box>
            <Phrase
              testID="HomeTestAdminBuildNumberPhrase"
              textAlign="center">
              {VERSION_NUMBER_WITH_BUILD}
            </Phrase>
          </Box>
        </Column>
        <Box>
          <HomeAdminTestButtons />
        </Box>
      </>
    )}
  </Screen>
)
