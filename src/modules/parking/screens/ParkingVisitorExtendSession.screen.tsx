import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {TimeDifferenceNotice} from '@/modules/parking/components/TimeDifferenceNotice'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/form/ParkingChooseEndTimeButton'
import {ParkingReceipt} from '@/modules/parking/components/form/ParkingReceipt'
import {
  ParkingSessionFormProvider,
  type ParkingSessionFormValues,
} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingVisitorExtendSessionButton} from '@/modules/parking/components/form/ParkingVisitorExtendSessionButton'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/form/bottomsheet/ParkingSessionBottomSheet'
import {ParkingFixedFormField} from '@/modules/parking/components/session/ParkingFixedFormField'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

type Props = NavigationProps<ParkingRouteName.editSession>

export const ParkingVisitorExtendSessionScreen = ({route}: Props) => {
  const {parkingSession} = route.params ?? {}

  return (
    <CurrentPermitProvider>
      <ParkingSessionFormProvider
        extendVisitorSession
        parkingSession={parkingSession}>
        <Screen
          bottomSheet={<ParkingSessionBottomSheet />}
          hasStickyAlert
          testID="ParkingVisitorExtendSessionScreen">
          <Box>
            <Column gutter="lg">
              <ParkingFixedFormField<ParkingSessionFormValues>
                fieldName="licensePlate.vehicle_id"
                label="Kenteken"
              />
              <ParkingFixedFormField<ParkingSessionFormValues>
                fieldName="parking_machine"
                label="Parkeerautomaat"
              />
              <ParkingFixedFormField<
                ParkingSessionFormValues,
                'originalEndTime'
              >
                fieldName="originalEndTime"
                label="Starttijd"
                transformValue={time => formatDateTimeToDisplay(time, false)}
              />
              <Column gutter="xl">
                <Column gutter="md">
                  <TimeDifferenceNotice />
                  <ParkingChooseEndTimeButton />
                </Column>
                <ParkingReceipt />
              </Column>

              <ParkingVisitorExtendSessionButton />
            </Column>
          </Box>
        </Screen>
      </ParkingSessionFormProvider>
    </CurrentPermitProvider>
  )
}
