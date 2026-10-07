import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/form/bottomsheet/ParkingSessionBottomSheet'
import {ParkingChooseLicensePlateButton} from '@/modules/parking/components/form/ParkingChooseLicensePlateButton'
import {ParkingPermitNotYetActiveNotice} from '@/modules/parking/components/form/ParkingPermitNotYetActiveNotice'
import {ParkingReceipt} from '@/modules/parking/components/form/ParkingReceipt'
import {ParkingSessionChooseParkingMachine} from '@/modules/parking/components/form/ParkingSessionChooseParkingMachine'
import {ParkingSessionChooseTime} from '@/modules/parking/components/form/ParkingSessionChooseTime'
import {ParkingSessionFormProvider} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingSessionSubmitButton} from '@/modules/parking/components/form/ParkingSessionSubmitButton'
import {ParkingMaxSessionsWarning} from '@/modules/parking/components/session/ParkingMaxSessionsWarning'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.startSession>

export const ParkingStartSessionScreen = ({route}: Props) => {
  const {params} = route || {}

  return (
    <CurrentPermitProvider>
      <ParkingSessionFormProvider
        defaultValues={{
          licensePlate: params?.licensePlate,
          startTime: params?.defaultStartTime,
        }}>
        <Screen
          bottomSheet={<ParkingSessionBottomSheet />}
          keyboardAware
          stickyFooter={
            <Box
              insetBottom="smd"
              insetHorizontal="md">
              <ParkingSessionSubmitButton />
            </Box>
          }
          testID="ParkingStartSessionScreen">
          <Box>
            <Column gutter="xl">
              <Column gutter="lg">
                <ParkingChooseLicensePlateButton />
                <ParkingSessionChooseParkingMachine
                  selectedParkingMachineId={params?.parkingMachineId}
                />

                <ParkingPermitNotYetActiveNotice />
                <ParkingSessionChooseTime />

                <ParkingMaxSessionsWarning />
              </Column>
              <ParkingReceipt />
            </Column>
          </Box>
        </Screen>
      </ParkingSessionFormProvider>
    </CurrentPermitProvider>
  )
}
