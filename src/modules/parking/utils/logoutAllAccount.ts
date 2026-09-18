import type {ReduxDispatch} from '@/hooks/redux/types'
import type {RootState} from '@/store/types/rootState'
import {parkingSlice, selectParkingAccounts} from '@/modules/parking/slice'
import {logout} from '@/modules/parking/utils/logout'
import {devError} from '@/processes/development'

export const logoutAllAccounts = async (
  dispatch: ReduxDispatch,
  state: RootState,
) => {
  try {
    const parkingAccounts = selectParkingAccounts(state)

    await Promise.all(
      Object.values(parkingAccounts).map(({reportCode}) =>
        logout(dispatch, state, undefined, reportCode),
      ),
    )
    dispatch(parkingSlice.actions.reset())

    return true
  } catch (error) {
    devError(error)
    throw error
  }
}
