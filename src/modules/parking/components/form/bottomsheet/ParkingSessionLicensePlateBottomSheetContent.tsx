import {useController, useFormContext} from 'react-hook-form'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ParkingSessionAddLicensePlateSubmitButton} from '@/modules/parking/components/form/bottomsheet/ParkingSessionAddLicensePlateSubmitButton'
import {ParkingSessionAddLicensePlate} from '@/modules/parking/components/form/ParkingSessionAddLicensePlate'
import type {ParkingSessionFormValues} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingSessionLicensePlateFormProvider} from '@/modules/parking/components/form/ParkingSessionLicensePlateFormProvider'
import {ParkingSessionSelectLicensePlate} from '@/modules/parking/components/form/ParkingSessionSelectLicensePlate'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingLicensePlate, ParkingPermitScope} from '@/modules/parking/types'

export const ParkingSessionLicensePlateBottomSheetContent = () => {
  const currentPermit = useCurrentParkingPermit()
  const {watch} = useFormContext<ParkingSessionFormValues>()
  const parkingAccount = useParkingAccount()

  const {
    field: {onChange},
  } = useController<{licensePlate?: ParkingLicensePlate}, 'licensePlate'>({
    name: 'licensePlate',
  })

  const {forced_license_plate_list} = currentPermit

  return (
    <Box grow>
      <ParkingSessionLicensePlateFormProvider
        defaultValues={{vehicle_id: watch('licensePlate')?.vehicle_id}}>
        <Column
          grow={1}
          gutter="lg">
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
        </Column>
      </ParkingSessionLicensePlateFormProvider>
    </Box>
  )
}
