import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import type {TestProps} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingDashboardNavigationButtons = () => {
  const {navigate} = useNavigation()
  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()

  return (
    <Column gutter="xs">
      {parkingAccount?.scope === ParkingPermitScope.permitHolder && (
        <>
          <ParkingDashboardNavigationButton
            onPress={() => {
              navigate(ParkingRouteName.parkingPlannedSessions)
            }}
            testID="ParkingPlannedSessionsButton"
            title="Geplande parkeersessies"
          />
          <ParkingDashboardNavigationButton
            onPress={() => {
              navigate(ParkingRouteName.parkingSessionTransactions)
            }}
            testID="ParkingParkingHistoryButton"
            title="Parkeergeschiedenis"
          />
          <ParkingDashboardNavigationButton
            onPress={() => {
              navigate(ParkingRouteName.myLicensePlates)
            }}
            testID="ParkingLicensePlatesButton"
            title="Mijn kentekens"
          />
          {!!currentPermit.money_balance_applicable && (
            <ParkingDashboardNavigationButton
              onPress={() => {
                navigate(ParkingRouteName.parkingMoneyTransactions)
              }}
              testID="ParkingPaymentHistoryButton"
              title="Betalingen"
            />
          )}
        </>
      )}

      <ParkingDashboardNavigationButton
        onPress={() => {
          navigate(ParkingRouteName.parkingPermitZones)
        }}
        testID="ParkingPermitZoneButton"
        title="Vergunninggebied"
      />
    </Column>
  )
}

type ParkingDashboardNavigationButtonProps = {
  onPress: () => void
  title: string
} & TestProps

const ParkingDashboardNavigationButton = (
  props: ParkingDashboardNavigationButtonProps,
) => (
  <NavigationButton
    chevronSize="md"
    insetHorizontal="no"
    {...props}
  />
)
