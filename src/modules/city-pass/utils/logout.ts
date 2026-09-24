import type {ReduxDispatch} from '@/hooks/redux/types'
import {alerts} from '@/modules/city-pass/alerts'
import {tagTypes} from '@/modules/city-pass/constants'
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
      await dispatch(cityPassApi.endpoints.logout.initiate()).unwrap()
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

    // invalidate the city pass data cache after logout with a delay to make sure all queries are unmounted, otherwise they will try to refetch and that will result in useless 401 errors
    setTimeout(() => {
      dispatch(cityPassApi.util.invalidateTags(tagTypes))
    }, 1000)

    if (successAlert) {
      setTimeout(() => dispatch(setAlertAction(alerts[successAlert])), 100)
    }

    return true
  } catch (error) {
    devError(error)
    throw error
  }
}
