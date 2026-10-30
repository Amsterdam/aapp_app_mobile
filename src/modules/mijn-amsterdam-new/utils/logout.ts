import {type ReduxDispatch} from '@/hooks/redux/types'
import {mijnAmsterdamApi} from '@/modules/mijn-amsterdam-new/service'
import {
  mijnAmsterdamNewSlice,
  selectIsLoggedIn,
} from '@/modules/mijn-amsterdam-new/slice'
import {devError} from '@/processes/development'
import type {RootState} from '@/store/types/rootState'

export const logout = async (dispatch: ReduxDispatch, state: RootState) => {
  try {
    const isLoggedIn = selectIsLoggedIn(state)

    if (isLoggedIn) {
      await dispatch(
        mijnAmsterdamApi.endpoints.mijnAmsterdamLogout.initiate(),
      ).unwrap()
    }

    dispatch(mijnAmsterdamNewSlice.actions.reset())

    return true
  } catch (error) {
    devError(error)
    throw error
  }
}
