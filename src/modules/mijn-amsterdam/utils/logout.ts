import {type ReduxDispatch} from '@/hooks/redux/types'
import {mijnAmsterdamApi} from '@/modules/mijn-amsterdam/service'

export const logout = async (dispatch: ReduxDispatch) => {
  await dispatch(mijnAmsterdamApi.endpoints.mijnAmsterdamLogout.initiate())
}
