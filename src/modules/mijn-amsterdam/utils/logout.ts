import type {RootState} from '@/store/types/rootState'
import {type ReduxDispatch} from '@/hooks/redux/types'
import {mijnAmsterdamApi} from '@/modules/mijn-amsterdam/service'
import {
  mijnAmsterdamSlice,
  selectIsLoggedIn,
} from '@/modules/mijn-amsterdam/slice'
import {devError} from '@/processes/development'

export const logout = async (dispatch: ReduxDispatch, state: RootState) => {
  try {
    const isLoggedIn = selectIsLoggedIn(state)

    if (isLoggedIn) {
      await dispatch(mijnAmsterdamApi.endpoints.mijnAmsterdamLogout.initiate())
    }

    dispatch(mijnAmsterdamSlice.actions.reset())

    return true
  } catch (error) {
    devError(error)
    throw error
  }
}
