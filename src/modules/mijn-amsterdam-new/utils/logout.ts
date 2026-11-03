import {type ReduxDispatch} from '@/hooks/redux/types'
import {
  mijnAmsterdamNewSlice,
  setIsLoggedIn,
} from '@/modules/mijn-amsterdam-new/slice'
import {devError} from '@/processes/development'
import {deleteSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import type {RootState} from '@/store/types/rootState'
import {removeSecureItems, SecureItemKey} from '@/utils/secureStorage'

export const logout = async (dispatch: ReduxDispatch, _state: RootState) => {
  try {
    await removeSecureItems([SecureItemKey.mijnAmsterdamAccessToken])
    dispatch(
      deleteSecureItemUpdatedTimestamp(SecureItemKey.mijnAmsterdamAccessToken),
    )
    dispatch(setIsLoggedIn({isLoggedIn: false, profileName: 'uitloggen'}))

    dispatch(mijnAmsterdamNewSlice.actions.reset())

    return true
  } catch (error) {
    devError(error)
    throw error
  }
}
