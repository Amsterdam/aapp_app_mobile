import {useEffect} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/mijn-amsterdam/alerts'
import {mijnAmsterdamApi} from '@/modules/mijn-amsterdam/service'
import {ModuleSlug} from '@/modules/slugs'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'
import {LoginResult} from '@/types/navigation'

export const useHandleLoginDeeplink = (loginResult?: LoginResult) => {
  const {setAlert} = useAlert()
  const trackException = useTrackException()

  const dispatch = useDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    const parentRoutes = navigation.getParent()?.getState().routes
    const fromOnboarding = parentRoutes?.some(
      route => route.name === (ModuleSlug.onboarding as string),
    )

    if (loginResult === LoginResult.success) {
      if (!fromOnboarding) {
        setAlert(alerts.loginSuccess)
      }

      dispatch(mijnAmsterdamApi.util.invalidateTags(['MijnAmsterdam']))
    } else if (loginResult === LoginResult.failed) {
      if (!fromOnboarding) {
        setAlert(alerts.loginFailed)
      }

      trackException(ExceptionLogKey.deepLink, 'useHandleLoginDeeplink.ts')
    }

    if (loginResult && fromOnboarding) {
      navigation.goBack()
    }
  }, [dispatch, loginResult, setAlert, trackException, navigation])
}
