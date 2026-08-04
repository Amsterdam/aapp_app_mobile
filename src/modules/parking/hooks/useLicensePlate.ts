import {useMemo} from 'react'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'

export const useLicensePlate = (
  vehicleId: string,
  visitorNameParam?: string,
) => {
  const {licensePlates} = useGetLicensePlates()
  const licensePlate = useMemo(
    () =>
      licensePlates?.find(
        lp => lp.vehicle_id?.toUpperCase() === vehicleId?.toUpperCase(),
      ),
    [licensePlates, vehicleId],
  )
  const visitorName = visitorNameParam ?? licensePlate?.visitor_name

  return {
    licensePlate,
    licensePlateString: `${vehicleId}${visitorName ? ' - ' + visitorName : ''}`,
    visitorName,
  }
}
