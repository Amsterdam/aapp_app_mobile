import {FormProvider, useForm} from 'react-hook-form'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {ParkingSessionAmountBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionAmountBottomSheetContent'
import {ParkingChooseAmountButton} from '@/modules/parking/components/form/ParkingChooseAmountButton'
import {ParkingIncreaseBalanceButton} from '@/modules/parking/components/form/ParkingIncreaseBalanceButton'
import {ParkingIncreaseBalanceReceipt} from '@/modules/parking/components/form/ParkingIncreaseBalanceReceipt'

export type ParkingIncreaseBalanceFormValues = {amount?: number}

export const ParkingIncreaseBalanceScreen = () => {
  const form = useForm<ParkingIncreaseBalanceFormValues>()

  return (
    <FormProvider {...form}>
      <Screen
        bottomSheet={
          <BottomSheet
            scroll
            testID="ParkingIncreaseBalanceBottomSheet">
            <ParkingSessionAmountBottomSheetContent />
          </BottomSheet>
        }
        testID="ParkingIncreaseBalanceScreen">
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
    </FormProvider>
  )
}
