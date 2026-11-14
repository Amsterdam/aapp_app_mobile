import {FormProvider, useForm} from 'react-hook-form'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ParkingVehicleIdTextInput} from '@/modules/parking/components/form/ParkingVehicleIdTextInput'
import {useVisitorVehicleId} from '@/modules/parking/slice'

export const ParkingSessionVisitorLicensePlateForm = () => {
  const form = useForm<{vehicle_id: string}>()
  const {handleSubmit} = form
  const {visitorVehicleId, setVisitorVehicleId} = useVisitorVehicleId()
  const {close} = useBottomSheet()

  const onSubmit = ({vehicle_id}: {vehicle_id: string}) => {
    setVisitorVehicleId(vehicle_id)
    close()
  }

  return (
    <FormProvider {...form}>
      <Box>
        <Column gutter="xl">
          <ParkingVehicleIdTextInput
            defaultValue={visitorVehicleId}
            inputInstructions="Alleen letters en cijfers"
            label="Uw kenteken"
            testID="ParkingSessionShowVisitorSessionsFormLicensePlateInputField"
          />

          <Button
            label="Bekijk parkeersessies"
            onPress={handleSubmit(onSubmit)}
            testID="ParkingSessionShowVisitorSessionsFormSubmitButton"
          />
        </Column>
      </Box>
    </FormProvider>
  )
}
