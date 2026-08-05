import {useCallback, useState} from 'react'
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
  const [isLoadingEditLicensePlate, setIsLoadingEditLicensePlate] =
    useState(false)
  const [isErrorEditLicensePlate, setIsErrorEditLicensePlate] = useState(false)

  const [
    addLicensePlate,
    {isLoading: isLoadingAddLicensePlate, isError: isErrorAddLicensePlate},
  ] = useAddLicensePlateMutation()

  const [
    removeLicensePlate,
    {
      isLoading: isLoadingRemoveLicensePlate,
      isError: isErrorRemoveLicensePlate,
    },
  ] = useRemoveLicensePlateMutation()

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
    async ({
      id,
      vehicle_id,
      visitor_name,
    }: Omit<ParkingLicensePlate, 'visitor_name'> &
      NonNullable<{visitor_name: string}>) => {
      try {
        setIsErrorEditLicensePlate(false)
        setIsLoadingEditLicensePlate(true)

        if (!licensePlates?.find(plate => plate.id === id)) {
          throw new Error('No matching license plate found to edit.')
        }

        await deleteLicensePlate({id, vehicle_id}).catch(() => {
          throw new Error('delete')
        })
        await saveLicensePlate({vehicle_id, visitor_name}).catch(() => {
          throw new Error('save')
        })
      } catch (error) {
        setIsErrorEditLicensePlate(true)
        throw error
      } finally {
        setIsLoadingEditLicensePlate(false)
      }
    },
    [deleteLicensePlate, licensePlates, saveLicensePlate],
  )

  return {
    deleteLicensePlate,
    saveLicensePlate,
    editLicensePlate,
    isLoadingRemoveLicensePlate,
    isErrorRemoveLicensePlate,
    isLoadingAddLicensePlate,
    isErrorAddLicensePlate,
    isLoadingEditLicensePlate,
    isErrorEditLicensePlate,
  }
}
