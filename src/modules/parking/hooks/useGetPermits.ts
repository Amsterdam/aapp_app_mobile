import {useEffect, useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {usePermitsQuery} from '@/modules/parking/service'
import {
  parkingSlice,
  useCurrentParkingAccount,
  useCurrentParkingPermitReportCode,
} from '@/modules/parking/slice'
import {filterPermits} from '@/modules/parking/utils/filterPermits'
import {fixPermitNames} from '@/modules/parking/utils/fixPermitNames'

export const useGetPermits = (skip = false) => {
  const dispatch = useDispatch()
  const {data, isLoading, refetch} = usePermitsQuery({status: 'ACTIVE'}, {skip})
  const currentParkingAccount = useCurrentParkingAccount()

  const currentPermitReportCode = useCurrentParkingPermitReportCode()
  const {setCurrentPermitReportCode, setParkingAccountPermits} =
    parkingSlice.actions

  const permits = useMemo(() => {
    if (!data) {
      return
    }

    return filterPermits(fixPermitNames(data))
  }, [data])

  useEffect(() => {
    void refetch()
  }, [currentParkingAccount, refetch])

  useEffect(() => {
    if (permits?.length && !currentPermitReportCode) {
      setCurrentPermitReportCode(permits[0].report_code.toString())
    }
  }, [currentPermitReportCode, permits, setCurrentPermitReportCode])

  useEffect(() => {
    if (permits?.length) {
      dispatch(setParkingAccountPermits(permits))
    }
  }, [permits, dispatch, setParkingAccountPermits])

  return {
    permits,
    isLoading,
    refetch,
  }
}
