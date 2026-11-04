import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {ParkingLicensePlateFormProvider} from '@/modules/parking/components/form/ParkingLicensePlateFormProvider'
import {ParkingVehicleIdTextInput} from '@/modules/parking/components/form/ParkingVehicleIdTextInput'
import {LicensePlateFormDeleteButton} from '@/modules/parking/components/license-plates/LicensePlateFormDeleteButton'
import {LicensePlateFormSubmitButton} from '@/modules/parking/components/license-plates/LicensePlateFormSubmitButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {useLicensePlateMutations} from '@/modules/parking/hooks/useLicensePlateMutations'
import {ParkingLicensePlate} from '@/modules/parking/types'

type Props = {
  licensePlateId?: ParkingLicensePlate['id']
}

export const LicensePlateForm = ({licensePlateId}: Props) => {
  const {licensePlates} = useGetLicensePlates()
  const currentPermit = useCurrentParkingPermit()
  const licensePlateMutationsProps = useLicensePlateMutations()
  const prefilledLicensePlate = licensePlates?.find(
    plate => plate.id === licensePlateId,
  )

  return (
    <ParkingLicensePlateFormProvider defaultValues={prefilledLicensePlate}>
      <Column gutter="xl">
        <Column gutter="lg">
          <ParkingVehicleIdTextInput
            inputInstructions="Voer alleen letters en cijfers in."
            label="Kenteken"
            testID="ParkingLicensePlateFormLicensePlateInputField"
          />
          <TextInputField
            hasClearButton={false}
            label="Naam"
            name="visitor_name"
            rules={{
              required: 'Vul een naam in',
              maxLength: {
                value: 50,
                message: 'De ingevoerde naam is te lang',
              },
            }}
            testID="ParkingLicensePlateFormNameInputField"
          />
          <LicensePlateFormSubmitButton
            {...licensePlateMutationsProps}
            prefilledLicensePlate={prefilledLicensePlate}
          />
        </Column>

        {!currentPermit.forced_license_plate_list &&
          !!prefilledLicensePlate && (
            <LicensePlateFormDeleteButton
              {...licensePlateMutationsProps}
              prefilledLicensePlate={prefilledLicensePlate}
            />
          )}
      </Column>
    </ParkingLicensePlateFormProvider>
  )
}
