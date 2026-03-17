import type {RootState} from '@/store/types/rootState'
import {type ReduxDispatch} from '@/hooks/redux/types'
import {mijnAmsterdamApi} from '@/modules/mijn-amsterdam/service'
import {selectIsLoggedIn} from '@/modules/mijn-amsterdam/slice'

export const logout = async (dispatch: ReduxDispatch, state: RootState) => {
  const isLoggedIn = selectIsLoggedIn(state)

  if (!isLoggedIn) {
    return
  }

  await dispatch(mijnAmsterdamApi.endpoints.mijnAmsterdamLogout.initiate())
}
