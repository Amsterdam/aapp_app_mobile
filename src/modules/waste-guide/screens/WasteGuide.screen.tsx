import {FeatureFlag} from '@/components/features/FeatureFlag'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Features} from '@/constants/featureFlags'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {BottomSheetSurvey} from '@/modules/survey/exports/BottomSheetSurvey'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'
import {WasteGuideInformation} from '@/modules/waste-guide/components/WasteGuideInformation'
import {WasteGuideMoreOptions} from '@/modules/waste-guide/components/WasteGuideMoreOptions'
import {WasteGuideNotificationToggleBox} from '@/modules/waste-guide/components/WasteGuideNotificationToggleBox'
import {WasteGuideShare} from '@/modules/waste-guide/components/WasteGuideShare'

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()

  return (
    <Screen
      bottomSheet={<BottomSheetSurvey testID="SelectLocationTypeBottomSheet" />}
      headerOptions={{SideComponent: WasteGuideShare}}
      testID="WasteGuideScreen"
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      <HorizontalSafeArea>
        <Box>
          <Column gutter="xl">
            <WasteGuide />
            <FeatureFlag feature={Features.WasteGuideNotifications}>
              <WasteGuideNotificationToggleBox />
            </FeatureFlag>
            <WasteGuideMoreOptions />
            <WasteGuideInformation />
          </Column>
        </Box>
      </HorizontalSafeArea>
    </Screen>
  )
}
