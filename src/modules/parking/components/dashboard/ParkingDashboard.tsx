import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ParkingDashboardNavigationButtons} from '@/modules/parking/components/dashboard/ParkingDashboardNavigationButtons'
import {ParkingDashboardVisitorChooseLicensePlateSwitch} from '@/modules/parking/components/dashboard/ParkingDashboardVisitorChooseLicensePlateSwitch'
import {ParkingPaymentByVisitorButton} from '@/modules/parking/components/dashboard/ParkingPaymentByVisitorButton'
import {ParkingPermitBalance} from '@/modules/parking/components/dashboard/ParkingPermitBalance'
import {ParkingStartSessionButton} from '@/modules/parking/components/dashboard/ParkingStartSessionButton'
import {ParkingInfoSection} from '@/modules/parking/components/ParkingInfoSection'
import {ParkingPermitSwitcher} from '@/modules/parking/components/ParkingPermitSwitcher'
import {ParkingUpcomingSessionsSummary} from '@/modules/parking/components/session/ParkingUpcomingSessionsSummary'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount, useVisitorVehicleId} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {getPermitStartDateString} from '@/modules/parking/utils/getPermitStartDateString'

export const ParkingDashboard = () => {
  const currentPermit = useCurrentParkingPermit()
  const {isPermitStartedAtInFuture, started_at} = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()
  const {visitorVehicleId} = useVisitorVehicleId()

  return (
    <Column gutter="lg">
      <ParkingPermitSwitcher />

      <Column gutter="xl">
        <Box variant="distinct">
          <Column gutter="lg">
            <Column gutter="sm">
              <Title
                level="h2"
                testID="ParkingPermitSessionsTitle"
                text="Parkeersessies"
              />

              {isPermitStartedAtInFuture ? (
                <Paragraph>
                  Uw vergunning is nog niet actief.{' '}
                  {getPermitStartDateString(started_at)}
                </Paragraph>
              ) : (
                <>
                  {parkingAccount?.scope === ParkingPermitScope.visitor && (
                    <ParkingDashboardVisitorChooseLicensePlateSwitch />
                  )}
                  {(parkingAccount?.scope === ParkingPermitScope.permitHolder ||
                    !!visitorVehicleId) && <ParkingUpcomingSessionsSummary />}
                </>
              )}
            </Column>

            {!currentPermit.isPermitStartedAtInFuture && (
              <Column gutter="md">
                <ParkingStartSessionButton />
                <ParkingPaymentByVisitorButton />
              </Column>
            )}
            <ParkingDashboardNavigationButtons />
          </Column>
        </Box>

        <ParkingPermitBalance />
      </Column>

      <ParkingInfoSection />
    </Column>
  )
}
