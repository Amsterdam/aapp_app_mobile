import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ParkingDashboardPermitSessionsChooseVisitorLicensePlate} from '@/modules/parking/components/dashboard/ParkingDashboardPermitSessionsChooseVisitorLicensePlate'
import {ParkingActiveSessionsSummary} from '@/modules/parking/components/session/ParkingActiveSessionsSummary'
import {ParkingPlannedSessionsSummary} from '@/modules/parking/components/session/ParkingPlannedSessionsSummary'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount, useVisitorVehicleId} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {getPermitStartDateString} from '@/modules/parking/utils/getPermitStartDateString'

export const ParkingPermitSessions = () => {
  const {visitorVehicleId} = useVisitorVehicleId()
  const {no_endtime, isPermitStartedAtInFuture, started_at} =
    useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()

  return (
    <Box
      insetBottom={isPermitStartedAtInFuture ? 'no' : 'md'}
      insetHorizontal="md"
      insetTop="md"
      variant="distinct">
      <Column gutter="lg">
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
              <ParkingDashboardPermitSessionsChooseVisitorLicensePlate />
            )}
            {(parkingAccount?.scope === ParkingPermitScope.permitHolder ||
              !!visitorVehicleId) && (
              <>
                <ParkingActiveSessionsSummary />
                {!no_endtime && <ParkingPlannedSessionsSummary />}
              </>
            )}
          </>
        )}
      </Column>
    </Box>
  )
}
