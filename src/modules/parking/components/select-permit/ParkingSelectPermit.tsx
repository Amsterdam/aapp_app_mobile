import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useSetBottomSheetElementFocus} from '@/hooks/accessibility/useSetBottomSheetElementFocus'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AdditionalLoginButton} from '@/modules/parking/components/select-permit/AdditionalLoginButton'
import {ParkingSelectPermitAccounts} from '@/modules/parking/components/select-permit/ParkingSelectPermitAccounts'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccounts} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {isEmptyObject} from '@/utils/object'

export const ParkingSelectPermit = () => {
  const {navigate} = useNavigation()
  const focusRef = useSetBottomSheetElementFocus()

  const parkingAccounts = useParkingAccounts()

  if (isEmptyObject(parkingAccounts)) {
    return <SomethingWentWrong testID="ParkingSelectPermitSomethingWentWrong" />
  }

  return (
    <Box grow>
      <Column gutter="lg">
        <Column gutter="sm">
          {Object.values(parkingAccounts).some(
            acc => acc.scope === ParkingPermitScope.permitHolder,
          ) && (
            <Title
              level="h4"
              ref={focusRef}
              testID="ParkingSelectPermitTitle"
              text="Mijn vergunningen"
            />
          )}
          <ParkingSelectPermitAccounts
            accounts={parkingAccounts}
            focusRef={focusRef}
          />
        </Column>
        <Column gutter="md">
          <AdditionalLoginButton testID="ParkingSelectPermitLoginTopTaskButton" />
          <NavigationButton
            chevronSize="md"
            emphasis="default"
            horizontallyAlign="center"
            onPress={() => navigate(ParkingRouteName.logout)}
            testID="ParkingSelectPermitLogoutNavigationButton"
            title="Beheer account en uitloggen"
          />
        </Column>
      </Column>
    </Box>
  )
}
