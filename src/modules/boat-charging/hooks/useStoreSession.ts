import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {
  setAccessToken,
  setBoatChargingLoggedInUsername,
} from '@/modules/boat-charging/slice'
import type {BoatChargingOpenIdConnectTokens} from '@/modules/boat-charging/utils/openIdConnect'

export const useStoreSession = () => {
  const dispatch = useDispatch()

  return useCallback(
    (session: BoatChargingOpenIdConnectTokens) => {
      const {
        accessToken: openIdConnectAccessToken,
        accessTokenExpirationInSeconds,
        username,
      } = session

      dispatch(
        setAccessToken({
          accessToken: openIdConnectAccessToken,
          accessTokenExpiration: accessTokenExpirationInSeconds,
        }),
      )
      dispatch(setBoatChargingLoggedInUsername(username))
    },
    [dispatch],
  )
}
