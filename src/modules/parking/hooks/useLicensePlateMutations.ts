import {useCallback, useState} from 'react'
import type {ParkingLicensePlate} from '@/modules/parking/types'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useAddLicensePlateMutation,
  useRemoveLicensePlateMutation,
} from '@/modules/parking/service'
import {devError} from '@/processes/development'

export const useLicensePlateMutations = () => {
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
    }: {
      vehicle_id: ParkingLicensePlate['vehicle_id']
      visitor_name: NonNullable<ParkingLicensePlate['visitor_name']>
    }) =>
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
    }: {
      id: ParkingLicensePlate['id']
      vehicle_id: ParkingLicensePlate['vehicle_id']
      visitor_name: NonNullable<ParkingLicensePlate['visitor_name']>
    }) => {
      try {
        setIsErrorEditLicensePlate(false)
        setIsLoadingEditLicensePlate(true)

        await deleteLicensePlate({id, vehicle_id}).catch(error => {
          devError(error)
          throw new Error('delete')
        })
        await saveLicensePlate({vehicle_id, visitor_name}).catch(error => {
          devError(error)
          throw new Error('save')
        })
      } catch (error) {
        setIsErrorEditLicensePlate(true)
        throw error
      } finally {
        setIsLoadingEditLicensePlate(false)
      }
    },
    [deleteLicensePlate, saveLicensePlate],
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
