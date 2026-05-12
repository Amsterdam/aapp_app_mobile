import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {tagTypes} from '@/modules/parking/constants'
import {parkingApi} from '@/modules/parking/service'
import {parkingSlice} from '@/modules/parking/slice'

export const useSwitchPermit = () => {
  const dispatch = useDispatch()

  return useCallback(
    (reportCodeParkingAccount: string, reportCode: string) => {
      dispatch(parkingSlice.actions.setCurrentAccount(reportCodeParkingAccount))
      dispatch(parkingSlice.actions.setCurrentPermitReportCode(reportCode))
      dispatch(parkingApi.util.invalidateTags([...tagTypes]))
    },
    [dispatch],
  )
}
