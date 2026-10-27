import {useCallback, useMemo} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAsync} from '@/hooks/useAsync'
import {useOpenIdConnect} from '@/modules/boat-charging/hooks/useOpenIdConnect'
import {useStoreSession} from '@/modules/boat-charging/hooks/useStoreSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  selectBoatChargingAccessToken,
  selectBoatChargingAccessTokenExpiration,
  selectBoatChargingLoggedInUsername,
  removeAccount,
  setBoatChargingTemporaryUsername,
} from '@/modules/boat-charging/slice'
import {
  getStoredOpenIdConnectSession,
  signOutFromOpenIdConnect,
  signInWithOpenIdConnect,
  resendSignUpCodeWithOpenIdConnect,
} from '@/modules/boat-charging/utils/openIdConnect'
import {devError} from '@/processes/development'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {dayjs} from '@/utils/datetime/dayjs'

export const useOpenIdConnectAuth = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(selectBoatChargingAccessToken)
  const accessTokenExpiration = useSelector(
    selectBoatChargingAccessTokenExpiration,
  )
  const storeSession = useStoreSession()
  const {isLoading, isError, openIdConnectConfig, isReady} = useOpenIdConnect()
  const loggedInUsername = useSelector(selectBoatChargingLoggedInUsername)
  const {navigate} = useNavigation()

  const isAuthenticated = useMemo(() => Boolean(accessToken), [accessToken])

  const hasValidAccessToken = useMemo(() => {
    if (!accessToken || !accessTokenExpiration) {
      return false
    }

    const expirationTime = dayjs(accessTokenExpiration)

    if (!expirationTime.isValid()) {
      return false
    }

    return expirationTime.isAfter(dayjs())
  }, [accessToken, accessTokenExpiration])

  useAsync(async () => {
    if (openIdConnectConfig) {
      try {
        const storedSession =
          await getStoredOpenIdConnectSession(openIdConnectConfig)

        if (!storedSession) {
          return
        }

        storeSession(storedSession)
      } catch {
        dispatch(removeAccount())
      }
    }
  }, [dispatch, openIdConnectConfig, storeSession])
  const trackException = useTrackException()

  const signIn = useCallback(
    async (username: string, password: string) => {
      if (openIdConnectConfig) {
        try {
          const result = await signInWithOpenIdConnect(
            username,
            password,
            openIdConnectConfig,
          )

          if (result.isSignedIn) {
            storeSession(result.session)
            dispatch(setBoatChargingTemporaryUsername(undefined))
          } else if (result.nextStep === 'CONFIRM_SIGN_UP') {
            await resendSignUpCodeWithOpenIdConnect(
              username,
              openIdConnectConfig,
            )
            dispatch(setBoatChargingTemporaryUsername(username))
            navigate(BoatChargingRouteName.createAccountConfirm)
          } else {
            devError('Unhandled next step:', result.nextStep)
            trackException(
              ExceptionLogKey.boatChargingUnhandledNextStep,
              'useOpenIdConnectAuth.ts',
              {
                nextStep: result.nextStep,
              },
            )
          }
        } catch (error) {
          devError(error)
          throw new Error('Sign in failed')
        }
      } else {
        throw new Error('OpenID Connect config is not available')
      }
    },
    [dispatch, navigate, openIdConnectConfig, storeSession, trackException],
  )

  const signOut = useCallback(async () => {
    if (openIdConnectConfig) {
      await signOutFromOpenIdConnect(openIdConnectConfig)
    }

    dispatch(removeAccount())
  }, [dispatch, openIdConnectConfig])

  return {
    hasValidAccessToken,
    isAuthenticated,
    signIn,
    signOut,
    isLoading,
    isError,
    isReady,
    username: loggedInUsername,
  }
}
