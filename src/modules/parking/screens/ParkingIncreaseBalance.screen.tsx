import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionBottomSheet} from '@/modules/parking/components/form/bottomsheet/ParkingSessionBottomSheet'
import {ParkingChooseAmountButton} from '@/modules/parking/components/form/ParkingChooseAmountButton'
import {ParkingIncreaseBalanceButton} from '@/modules/parking/components/form/ParkingIncreaseBalanceButton'
import {ParkingIncreaseBalanceReceipt} from '@/modules/parking/components/form/ParkingIncreaseBalanceReceipt'
import {ParkingSessionFormProvider} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'

export const ParkingIncreaseBalanceScreen = () => (
  <CurrentPermitProvider>
    <ParkingSessionFormProvider>
      <Screen
        bottomSheet={<ParkingSessionBottomSheet />}
        testID="ParkingStartSessionScreen">
        <Box>
          <Column gutter="md">
            <ParkingChooseAmountButton />
            <Gutter height="sm" />
            <Title
              level="h2"
              testID="ParkingChooseTimeTitle"
              text="Geldsaldo"
            />
            <Column gutter="lg">
              <ParkingIncreaseBalanceReceipt />

              <ParkingIncreaseBalanceButton />
            </Column>
          </Column>
        </Box>
      </Screen>
    </ParkingSessionFormProvider>
  </CurrentPermitProvider>
)
