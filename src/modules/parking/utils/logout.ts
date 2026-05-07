import {type ReduxDispatch} from '@/hooks/redux/types'
import {
  parkingSlice,
  selectParkingAccount,
  selectParkingAccounts,
  setIsRecentlyLoggedOutAction,
} from '@/modules/parking/slice'
import {removeSecureParkingAccount} from '@/modules/parking/utils/removeSecureParkingAccount'
import {alertSlice, type AlertState} from '@/store/slices/alert'
import {type RootState} from '@/store/types/rootState'

export const logout = async (
  dispatch: ReduxDispatch,
  state: RootState,
  alert?: AlertState,
  parkingAccountReportCode?: string,
) => {
  const parkingAccounts = selectParkingAccounts(state)
  const parkingAccount = parkingAccountReportCode
    ? parkingAccounts[parkingAccountReportCode]
    : selectParkingAccount(state)
  const {reportCode, scope} = parkingAccount || {}

  if (!reportCode || !scope) {
    return
  }

  dispatch(parkingSlice.actions.setIsLoggingOut(true))

  if (alert) {
    dispatch(alertSlice.actions.setAlert(alert))
  } else {
    dispatch(alertSlice.actions.resetAlert())
  }

  await removeSecureParkingAccount(reportCode, scope, dispatch)
  dispatch(parkingSlice.actions.removeParkingAccount(reportCode))
  dispatch(setIsRecentlyLoggedOutAction(true))

  setTimeout(() => {
    dispatch(parkingSlice.actions.setIsLoggingOut(false))
  }, 1000)
}
