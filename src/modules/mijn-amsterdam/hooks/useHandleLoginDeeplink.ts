import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {useAsync} from '@/hooks/useAsync'
import {alerts} from '@/modules/mijn-amsterdam/alerts'
import {
  mijnAmsterdamApi,
  useGetMijnAmsterdamAccessTokenMutation,
} from '@/modules/mijn-amsterdam/service'
import {selectCodeVerifier} from '@/modules/mijn-amsterdam/slice'
import {ModuleSlug} from '@/modules/slugs'
import {devError} from '@/processes/development'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'
import {LoginResult} from '@/types/navigation'
import {Permissions} from '@/types/permissions'
import {SecureItemKey} from '@/utils/secureStorage'

export const useHandleLoginDeeplink = (
  loginResult?: LoginResult,
  authorizationCode?: string,
) => {
  const codeVerifier = useSelector(selectCodeVerifier)
  const {setAlert} = useAlert()
  const trackException = useTrackException()
  const {requestPermission} = usePermission(Permissions.notifications)

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const setSecureItem = useSetSecureItem()
  const [getMijnAmsterdamAccessToken] = useGetMijnAmsterdamAccessTokenMutation()

  useAsync(async () => {
    const parentRoutes = navigation.getParent()?.getState().routes
    const fromOnboarding = parentRoutes?.some(
      route => route.name === (ModuleSlug.onboarding as string),
    )

    if (loginResult === LoginResult.success) {
      void requestPermission()

      await getMijnAmsterdamAccessToken({
        authorizationCode: authorizationCode as string,
        codeVerifier: codeVerifier as string,
      })
        .unwrap()
        .then(async result => {
          await setSecureItem(
            SecureItemKey.mijnAmsterdamAccessToken,
            result.session.value,
          )

          if (!fromOnboarding) {
            setAlert(alerts.loginSuccess)
          }

          dispatch(mijnAmsterdamApi.util.invalidateTags(['MijnAmsterdam']))
        })
        .catch(error => {
          devError('Error fetching access token:', error)
          setAlert(alerts.loginFailed)
        })
    } else if (loginResult === LoginResult.failed) {
      if (!fromOnboarding) {
        setAlert(alerts.loginFailed)
      }

      trackException(ExceptionLogKey.deepLink, 'useHandleLoginDeeplink.ts')
    }

    if (loginResult && fromOnboarding) {
      navigation.goBack()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    navigation,
    loginResult,
    requestPermission,
    getMijnAmsterdamAccessToken,
    authorizationCode,
    dispatch,
    setAlert,
    setSecureItem,
    trackException,
  ])
}
