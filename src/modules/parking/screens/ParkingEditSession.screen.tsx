import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ParkingChooseEndTimeButton} from '@/modules/parking/components/form/ParkingChooseEndTimeButton'
import {ParkingEditSessionButtons} from '@/modules/parking/components/form/ParkingEditSessionButtons'
import {ParkingReceipt} from '@/modules/parking/components/form/ParkingReceipt'
import {
  ParkingSessionFormProvider,
  type ParkingSessionFormValues,
} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/form/bottomsheet/ParkingSessionBottomSheet'
import {ParkingFixedFormField} from '@/modules/parking/components/session/ParkingFixedFormField'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

type Props = NavigationProps<ParkingRouteName.editSession>

export const ParkingEditSessionScreen = ({route}: Props) => {
  const {parkingSession} = route.params ?? {}

  return (
    <CurrentPermitProvider>
      <ParkingSessionFormProvider parkingSession={parkingSession}>
        <Screen
          bottomSheet={<ParkingSessionBottomSheet />}
          hasStickyAlert
          testID="ParkingStartSessionScreen">
          <Box>
            <Column gutter="lg">
              <ParkingFixedFormField<ParkingSessionFormValues, 'startTime'>
                fieldName="startTime"
                label="Starttijd"
                transformValue={time => formatDateTimeToDisplay(time, false)}
              />

              <Column gutter="xl">
                <ParkingChooseEndTimeButton />
                <ParkingReceipt />
              </Column>

              <ParkingEditSessionButtons />
            </Column>
          </Box>
        </Screen>
      </ParkingSessionFormProvider>
    </CurrentPermitProvider>
  )
}
