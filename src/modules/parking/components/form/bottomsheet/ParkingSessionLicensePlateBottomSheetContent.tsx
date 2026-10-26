import {useController, useFormContext} from 'react-hook-form'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ParkingSessionAddLicensePlateSubmitButton} from '@/modules/parking/components/form/bottomsheet/ParkingSessionAddLicensePlateSubmitButton'
import {ParkingLicensePlateFormProvider} from '@/modules/parking/components/form/ParkingLicensePlateFormProvider'
import {ParkingSessionAddLicensePlate} from '@/modules/parking/components/form/ParkingSessionAddLicensePlate'
import type {ParkingSessionFormValues} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingSessionSelectLicensePlate} from '@/modules/parking/components/form/ParkingSessionSelectLicensePlate'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingSessionLicensePlateBottomSheetContent = () => {
  const currentPermit = useCurrentParkingPermit()
  const {watch} = useFormContext<ParkingSessionFormValues>()
  const parkingAccount = useParkingAccount()

  const {
    field: {onChange},
  } = useController<ParkingSessionFormValues, 'licensePlate'>({
    name: 'licensePlate',
  })

  const {forced_license_plate_list} = currentPermit

  return (
    <Box grow>
      <Column
        grow={1}
        gutter="lg">
        <ParkingLicensePlateFormProvider // Nested form inside ParkingSessionFormProvider
          defaultValues={{vehicle_id: watch('licensePlate')?.vehicle_id}}>
          {!forced_license_plate_list && (
            <>
              <ParkingSessionAddLicensePlate />
              <ParkingSessionAddLicensePlateSubmitButton
                setLicensePlate={onChange}
              />
            </>
          )}
          {parkingAccount?.scope === ParkingPermitScope.permitHolder && (
            <ParkingSessionSelectLicensePlate setLicensePlate={onChange} />
          )}
        </ParkingLicensePlateFormProvider>
      </Column>
    </Box>
  )
}
