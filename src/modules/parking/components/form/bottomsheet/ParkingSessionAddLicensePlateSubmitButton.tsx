import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {Button} from '@/components/ui/buttons/Button'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {useLicensePlateMutations} from '@/modules/parking/hooks/useLicensePlateMutations'
import {ParkingLicensePlate} from '@/modules/parking/types'
import {devError} from '@/processes/development'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

type Props = {
  setLicensePlate: (
    licensePlate: Optional<ParkingLicensePlate, 'id' | 'visitor_name'>,
  ) => void
}

export const ParkingSessionAddLicensePlateSubmitButton = ({
  setLicensePlate,
}: Props) => {
  const {close} = useBottomSheet()
  const {handleSubmit, reset} = useFormContext<ParkingLicensePlate>()
  const {
    saveLicensePlate,
    editLicensePlate,
    isLoadingAddLicensePlate,
    isLoadingEditLicensePlate,
    isErrorAddLicensePlate,
    isErrorEditLicensePlate,
  } = useLicensePlateMutations()
  const {licensePlates} = useGetLicensePlates()
  const trackException = useTrackException()

  const onSubmit = useCallback(
    async (licensePlate: ParkingLicensePlate) => {
      try {
        if (licensePlate.visitor_name) {
          const existingLicensePlate = licensePlates?.find(
            ({vehicle_id}) => vehicle_id === licensePlate.vehicle_id,
          )

          if (!existingLicensePlate) {
            await saveLicensePlate({
              vehicle_id: licensePlate.vehicle_id,
              visitor_name: licensePlate.visitor_name,
            })
          } else if (
            existingLicensePlate.visitor_name !== licensePlate.visitor_name
          ) {
            await editLicensePlate({
              id: existingLicensePlate.id,
              vehicle_id: existingLicensePlate.vehicle_id,
              visitor_name: licensePlate.visitor_name,
            })
          }
        }

        setLicensePlate(licensePlate)
      } catch (error) {
        devError(error)

        trackException(
          ExceptionLogKey.parkingLicensePlate,
          'ParkingSessionAddLicensePlateSubmitButton.tsx',
          {licensePlate, error},
        )
      } finally {
        close()
        reset()
      }
    },
    [
      licensePlates,
      close,
      trackException,
      reset,
      setLicensePlate,
      saveLicensePlate,
      editLicensePlate,
    ],
  )

  return (
    <Button
      isError={isErrorAddLicensePlate || isErrorEditLicensePlate}
      isLoading={isLoadingAddLicensePlate || isLoadingEditLicensePlate}
      label="Gereed"
      onPress={handleSubmit(onSubmit)}
      testID="ParkingSessionAddLicensePlateSubmitButton"
      variant="secondary"
    />
  )
}
