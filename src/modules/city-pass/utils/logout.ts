import {type ReduxDispatch} from '@/hooks/redux/types'
import {alerts} from '@/modules/city-pass/alerts'
import {cityPassApi} from '@/modules/city-pass/service'
import {cityPassSlice} from '@/modules/city-pass/slice'
import {devError} from '@/processes/development'
import {setAlertAction} from '@/store/slices/alert'
import {deleteSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {
  getSecureItem,
  removeSecureItems,
  SecureItemKey,
} from '@/utils/secureStorage'

export const logout = async (
  /**
   * show alert after successfully logging out
   */
  successAlert: keyof typeof alerts | false,
  dispatch: ReduxDispatch,
) => {
  try {
    const accessToken = await getSecureItem(SecureItemKey.cityPassAccessToken)

    if (accessToken) {
      void dispatch(cityPassApi.endpoints.logout.initiate())
    }

    await removeSecureItems([
      SecureItemKey.cityPassAccessToken,
      SecureItemKey.cityPassRefreshToken,
      SecureItemKey.cityPasses,
    ])
    dispatch(
      deleteSecureItemUpdatedTimestamp(SecureItemKey.cityPassAccessToken),
    )
    dispatch(
      deleteSecureItemUpdatedTimestamp(SecureItemKey.cityPassRefreshToken),
    )
    dispatch(cityPassSlice.actions.reset())

    if (successAlert) {
      setTimeout(() => dispatch(setAlertAction(alerts[successAlert])), 100)
    }

    return true
  } catch (error) {
    devError(error)
    throw error
  }
}
