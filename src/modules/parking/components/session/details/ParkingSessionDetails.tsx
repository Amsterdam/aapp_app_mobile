import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingMachineDetails} from '@/modules/parking/components/session/details/ParkingMachineDetails'
import {ParkingSessionDetailsAdjustEndTimeButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsAdjustEndTimeButton'
import {ParkingSessionDetailsDeleteButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsDeleteButton'
import {ParkingSessionDetailsRow} from '@/modules/parking/components/session/details/ParkingSessionDetailsRow'
import {ParkingSessionDetailsStopButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsStopButton'
import {ParkingSessionDetailsVisitorExtendButton} from '@/modules/parking/components/session/details/ParkingSessionDetailsVisitorExtendButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useLicensePlateString} from '@/modules/parking/hooks/useLicensePlateString'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount} from '@/modules/parking/slice'
import {
  ParkingHistorySession,
  ParkingPermitScope,
  ParkingSession,
  ParkingSessionStatus,
  VisitorParkingSession,
} from '@/modules/parking/types'
import {getPermitZoneLabel} from '@/modules/parking/utils/getPermitZoneLabel'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

export type ParkingSessionProps = {
  parkingSession: ParkingSession | VisitorParkingSession | ParkingHistorySession
}

export const ParkingSessionDetails = ({
  parkingSession,
}: ParkingSessionProps) => {
  const {navigate} = useNavigation()
  const parkingAccount = useParkingAccount()
  const currentPermit = useCurrentParkingPermit()

  const licensePlateString = useLicensePlateString(
    parkingSession.vehicle_id,
    parkingSession.visitor_name,
  )

  const shouldShowCosts =
    !!currentPermit.money_balance_applicable &&
    'parking_cost' in parkingSession &&
    !!parkingSession.parking_cost.value

  const isEditable =
    !parkingSession.no_endtime &&
    !!parkingSession.ps_right_id &&
    !!parkingSession.can_edit

  const isActiveWithoutEndTime =
    parkingSession.status === ParkingSessionStatus.active &&
    currentPermit.no_endtime

  return (
    <Box>
      <Column gutter="lg">
        <ParkingSessionDetailsRow
          iconName="car"
          title="Kenteken">
          <Phrase>{licensePlateString}</Phrase>
        </ParkingSessionDetailsRow>

        {!!parkingSession.parking_machine && (
          <ParkingMachineDetails
            parkingSession={parkingSession}
            report_code={currentPermit.report_code}
          />
        )}

        {!parkingSession.parking_machine && (
          <ParkingSessionDetailsRow
            iconName="map-marker"
            title={getPermitZoneLabel(currentPermit.permit_zone)}>
            <NavigationButton
              emphasis="default"
              iconSize="smd"
              insetHorizontal="no"
              insetVertical="no"
              onPress={() => navigate(ParkingRouteName.parkingPermitZones)}
              testID="ParkingParkingPermitZonesButton"
              title="Kaart bekijken"
            />
          </ParkingSessionDetailsRow>
        )}

        <ParkingSessionDetailsRow
          iconName="clock"
          title={
            isActiveWithoutEndTime
              ? 'Starttijd'
              : `Parkeertijd: ${formatTimeRangeToDisplay(
                  parkingSession.start_date_time,
                  parkingSession.end_date_time,
                )}`
          }>
          <Phrase>
            {formatDateTimeToDisplay(parkingSession.start_date_time, false)}
          </Phrase>
          {!!parkingSession.end_date_time && !isActiveWithoutEndTime && (
            <Phrase>
              {formatDateTimeToDisplay(parkingSession.end_date_time, false)}
            </Phrase>
          )}
        </ParkingSessionDetailsRow>

        {!!shouldShowCosts && (
          <ParkingSessionDetailsRow
            iconName="euro-coins_filled"
            title="Kosten">
            <Phrase>
              {formatNumber(
                parkingSession.parking_cost.value,
                parkingSession.parking_cost.currency,
              )}
            </Phrase>
          </ParkingSessionDetailsRow>
        )}

        {parkingAccount?.scope === ParkingPermitScope.permitHolder && (
          <>
            {!!isEditable && (
              <>
                {(parkingSession.status === ParkingSessionStatus.active ||
                  parkingSession.status === ParkingSessionStatus.planned) && (
                  <ParkingSessionDetailsAdjustEndTimeButton
                    parkingSession={parkingSession as ParkingSession}
                  />
                )}
                {parkingSession.status === ParkingSessionStatus.active && (
                  <ParkingSessionDetailsStopButton
                    parkingSession={parkingSession as ParkingSession}
                  />
                )}
                {parkingSession.status === ParkingSessionStatus.planned && (
                  <ParkingSessionDetailsDeleteButton
                    parkingSession={parkingSession as ParkingSession}
                  />
                )}
              </>
            )}
            {!!currentPermit.money_balance_applicable &&
              'is_paid' in parkingSession &&
              !parkingSession.is_paid && (
                <AlertBase
                  testID="ParkingSessionDetailsNotPaidAlert"
                  text="Even geduld."
                  title="We verwerken uw betaling"
                  variant={AlertVariant.information}
                />
              )}
          </>
        )}
        {parkingAccount?.scope === ParkingPermitScope.visitor &&
          parkingSession.status === ParkingSessionStatus.active &&
          !!parkingSession.ps_right_id && (
            <ParkingSessionDetailsVisitorExtendButton
              parkingSession={parkingSession as ParkingSession}
            />
          )}
      </Column>
    </Box>
  )
}
