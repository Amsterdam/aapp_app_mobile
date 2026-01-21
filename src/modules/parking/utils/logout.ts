import {type ReduxDispatch} from '@/hooks/redux/types'
import {parkingApi} from '@/modules/parking/service'
import {
  parkingSlice,
  selectParkingAccount,
  setShouldShowLoginScreenAction,
} from '@/modules/parking/slice'
import {removeSecureParkingAccount} from '@/modules/parking/utils/removeSecureParkingAccount'
import {alertSlice, type AlertState} from '@/store/slices/alert'
import {type RootState} from '@/store/types/rootState'

export const logout = async (
  shouldShowLoginScreen: boolean,
  dispatch: ReduxDispatch,
  state: RootState,
  alert?: AlertState,
) => {
  const parkingAccount = selectParkingAccount(state)
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
  dispatch(parkingSlice.actions.removeParkingAccount(undefined))
  shouldShowLoginScreen && dispatch(setShouldShowLoginScreenAction(true))

  // invalidate the parking data cache after logout with a delay to make sure all queries are unmounted, otherwise they will try to refetch and that will result in useless 401 errors
  setTimeout(() => {
    dispatch(parkingApi.util.resetApiState())
    dispatch(parkingSlice.actions.setIsLoggingOut(false))
  }, 1000)
}
