import {skipToken} from '@reduxjs/toolkit/query'
import {useLicensePlatesQuery} from '@/modules/parking/service'
import {
  useCurrentParkingPermitReportCode,
  useParkingAccount,
} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const useGetLicensePlates = () => {
  const reportCode = useCurrentParkingPermitReportCode()
  const parkingAccount = useParkingAccount()
  const isPermitHolder =
    parkingAccount?.scope === ParkingPermitScope.permitHolder

  const {data: licensePlates, isLoading} = useLicensePlatesQuery(
    reportCode && isPermitHolder
      ? {
          reportCode,
        }
      : skipToken,
  )

  return {licensePlates, isLoading}
}
