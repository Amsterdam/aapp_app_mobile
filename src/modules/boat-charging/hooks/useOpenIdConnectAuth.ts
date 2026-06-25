import {useCallback, useEffect, useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAsync} from '@/hooks/useAsync'
import {useBoatChargingOIDCConfigQuery} from '@/modules/boat-charging/service'
import {
  selectBoatChargingAccessToken,
  selectBoatChargingAccessTokenExpiration,
  resetAccessToken,
  setAccessToken,
  selectBoatChargingOpenIdConnectConfig,
  setBoatChargingOpenIdConnectConfig,
  selectBoatChargingLoggedInUsername,
  setBoatChargingLoggedInUsername,
  resetLoggedInUsername,
} from '@/modules/boat-charging/slice'
import {
  getStoredOpenIdConnectSession,
  signOutFromOpenIdConnect,
  signInWithOpenIdConnect,
} from '@/modules/boat-charging/utils/openIdConnect'
import {dayjs} from '@/utils/datetime/dayjs'

export const useOpenIdConnectAuth = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(selectBoatChargingAccessToken)
  const accessTokenExpiration = useSelector(
    selectBoatChargingAccessTokenExpiration,
  )
  const {isLoading, isError} = useBoatChargingOIDCConfigQuery()
  const openIdConnectConfig = useSelector(selectBoatChargingOpenIdConnectConfig)
  const loggedInUsername = useSelector(selectBoatChargingLoggedInUsername)

  useEffect(() => {
    if (openIdConnectConfig) {
      setBoatChargingOpenIdConnectConfig(openIdConnectConfig)
    }
  }, [openIdConnectConfig])

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

        const {
          accessTokenExpirationInSeconds,
          accessToken: restoredAccessToken,
          username: restoredUsername,
        } = storedSession

        dispatch(setBoatChargingLoggedInUsername(restoredUsername))

        dispatch(
          setAccessToken({
            accessToken: restoredAccessToken,
            accessTokenExpiration: accessTokenExpirationInSeconds,
          }),
        )
      } catch {
        dispatch(resetAccessToken())
      }
    }
  }, [dispatch, openIdConnectConfig])

  const signIn = useCallback(
    async (username: string, password: string) => {
      if (openIdConnectConfig) {
        const {
          accessToken: openIdConnectAccessToken,
          accessTokenExpirationInSeconds,
        } = await signInWithOpenIdConnect(
          username,
          password,
          openIdConnectConfig,
        )

        dispatch(
          setAccessToken({
            accessToken: openIdConnectAccessToken,
            accessTokenExpiration: accessTokenExpirationInSeconds,
          }),
        )
        dispatch(setBoatChargingLoggedInUsername(username))
      }
    },
    [dispatch, openIdConnectConfig],
  )

  const signOut = useCallback(async () => {
    if (openIdConnectConfig) {
      await signOutFromOpenIdConnect(openIdConnectConfig)
      dispatch(resetAccessToken())
      dispatch(resetLoggedInUsername())
    }
  }, [dispatch, openIdConnectConfig])

  return {
    hasValidAccessToken,
    isAuthenticated,
    signIn,
    signOut,
    isLoading: isLoading && !openIdConnectConfig,
    isError: isError && !openIdConnectConfig,
    isReady: !!openIdConnectConfig,
    username: loggedInUsername,
  }
}
