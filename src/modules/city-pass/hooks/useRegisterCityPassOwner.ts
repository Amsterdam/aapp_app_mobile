import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {alerts} from '@/modules/city-pass/alerts'
import {setIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'
import {RedirectErrorCodes} from '@/types/mijnAmsterdam'
import {LoginResult} from '@/types/navigation'
import {SecureItemKey} from '@/utils/secureStorage'

type Params = {
  deeplinkAccessToken?: string
  deeplinkRefreshToken?: string
  errorCode?: RedirectErrorCodes
  errorMessage?: string
  loginResult?: LoginResult
}

export const useRegisterCityPassOwner = ({
  errorCode,
  errorMessage,
  loginResult,
  deeplinkAccessToken,
  deeplinkRefreshToken,
}: Params) => {
  const dispatch = useDispatch()
  const {setAlert} = useAlert()
  const trackException = useTrackException()

  const setSecureItem = useSetSecureItem()

  useEffect(() => {
    if (loginResult === LoginResult.success) {
      dispatch(setIsCityPassOwnerRegistered(true))

      if (deeplinkAccessToken && deeplinkRefreshToken) {
        void setSecureItem(
          SecureItemKey.cityPassAccessToken,
          deeplinkAccessToken,
        )
        void setSecureItem(
          SecureItemKey.cityPassRefreshToken,
          deeplinkRefreshToken,
        )
      }
    } else if (loginResult === LoginResult.failed) {
      dispatch(setIsCityPassOwnerRegistered(false))
      setAlert(
        errorCode === RedirectErrorCodes['Geen administratienummer gevonden']
          ? alerts.noPassesInfo
          : alerts.retrievePassesFailed,
      )
      trackException(ExceptionLogKey.deepLink, 'useRegisterCityPassOwner.ts', {
        error: {
          deeplinkAccessToken,
          deeplinkRefreshToken,
          errorCode,
          errorMessage,
        },
      })
    } else {
      // do nothing
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginResult])
}
