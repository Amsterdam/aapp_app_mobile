import {selectParkingAccount} from '@/modules/parking/slice'
import {refreshAccessToken} from '@/modules/parking/utils/refreshAccessToken'
import {AfterBaseQueryErrorFn} from '@/services/types'
import {type RootState} from '@/store/types/rootState'

export const afterError: AfterBaseQueryErrorFn = async (
  {error},
  {dispatch, getState},
  failRetry,
) => {
  if (error?.status === 403) {
    const state = getState() as RootState
    const account = selectParkingAccount(state)

    if (!account) {
      failRetry('no account')

      return
    }

    return refreshAccessToken(
      account?.reportCode,
      account?.scope,
      dispatch,
      state,
    ).then(() => Promise.resolve())
  }
}
