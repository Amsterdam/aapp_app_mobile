import {useCallback} from 'react'
import type {ParkingLicensePlate} from '@/modules/parking/types'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {
  useAddLicensePlateMutation,
  useRemoveLicensePlateMutation,
} from '@/modules/parking/service'

export const useLicensePlateMutations = () => {
  const {licensePlates} = useGetLicensePlates()
  const currentPermit = useCurrentParkingPermit()

  const [addLicensePlate, {isLoading: isLoadingAddLicensePlate}] =
    useAddLicensePlateMutation()

  const [removeLicensePlate, {isLoading: isLoadingRemoveLicensePlate}] =
    useRemoveLicensePlateMutation()

  const saveLicensePlate = useCallback(
    ({
      vehicle_id,
      visitor_name,
    }: Omit<ParkingLicensePlate, 'visitor_name' | 'id'> &
      NonNullable<{visitor_name: string}>) =>
      addLicensePlate({
        report_code: currentPermit.report_code.toString(),
        vehicle_id,
        visitor_name,
      }).unwrap(),
    [addLicensePlate, currentPermit.report_code],
  )

  const deleteLicensePlate = useCallback(
    ({id, vehicle_id}: ParkingLicensePlate) =>
      removeLicensePlate({
        report_code: currentPermit.report_code.toString(),
        vehicle_id,
        id,
      }).unwrap(),

    [currentPermit.report_code, removeLicensePlate],
  )

  const editLicensePlate = useCallback(
    ({
      id,
      vehicle_id,
      visitor_name,
    }: Omit<ParkingLicensePlate, 'visitor_name'> &
      NonNullable<{visitor_name: string}>) => {
      if (!licensePlates?.find(plate => plate.id === id)) {
        throw new Error('No matching license plate found to edit.')
      }

      return deleteLicensePlate({id, vehicle_id}).then(() =>
        saveLicensePlate({vehicle_id, visitor_name}),
      )
    },
    [deleteLicensePlate, licensePlates, saveLicensePlate],
  )

  return {
    deleteLicensePlate,
    saveLicensePlate,
    editLicensePlate,
    isLoadingRemoveLicensePlate,
    isLoadingAddLicensePlate,
  }
}
