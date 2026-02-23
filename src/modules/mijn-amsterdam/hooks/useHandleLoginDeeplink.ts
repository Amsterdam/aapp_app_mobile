import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/mijn-amsterdam/alerts'
import {mijnAmsterdamApi} from '@/modules/mijn-amsterdam/service'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'
import {LoginResult} from '@/types/navigation'

export const useHandleLoginDeeplink = (loginResult?: LoginResult) => {
  const {setAlert} = useAlert()
  const trackException = useTrackException()

  const dispatch = useDispatch()

  useEffect(() => {
    if (loginResult === LoginResult.success) {
      setAlert(alerts.loginSuccess)
      dispatch(mijnAmsterdamApi.util.invalidateTags(['MijnAmsterdam']))
    } else if (loginResult === LoginResult.failed) {
      setAlert(alerts.loginFailed)
      trackException(ExceptionLogKey.deepLink, 'useHandleLoginDeeplink.ts')
    }
  }, [dispatch, loginResult, setAlert, trackException])
}
