import {useCallback, useEffect, useState} from 'react'
import {useGuestLoginMutation} from '@/modules/boat-charging/service'
import {useSetBoatChargingAccessToken} from '@/modules/boat-charging/slice'

export const useLoginAsGuest = () => {
  const setBoatChargingAccessToken = useSetBoatChargingAccessToken()
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
    void loginAsGuestUser()
  }, [loginAsGuestUser])

  return {loginAsGuestUser, isError, isLoading, error: error || localError}
}
