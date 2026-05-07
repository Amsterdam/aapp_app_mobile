import {useCallback, useEffect, useState} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useGuestLoginMutation} from '@/modules/boat-charging/service'
import {
  selectBoatChargingAccessToken,
  useSetBoatChargingAccessToken,
} from '@/modules/boat-charging/slice'

export const useLoginAsGuest = () => {
  const setBoatChargingAccessToken = useSetBoatChargingAccessToken()
  const accessToken = useSelector(selectBoatChargingAccessToken)
  const [guestLogin, {error, isError, isLoading}] = useGuestLoginMutation()
  const [localError, setLocalError] = useState<unknown>()

  const loginAsGuestUser = useCallback(async () => {
    try {
      const {access_token, expires_in} = await guestLogin().unwrap()

      setBoatChargingAccessToken(access_token, expires_in)
    } catch (err) {
      setLocalError(err)
    }
  }, [setBoatChargingAccessToken, guestLogin])

  useEffect(() => {
    if (!accessToken) {
      void loginAsGuestUser()
    }
  }, [loginAsGuestUser, accessToken])

  return {loginAsGuestUser, isError, isLoading, error: error || localError}
}
