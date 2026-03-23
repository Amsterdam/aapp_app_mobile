import {useFocusEffect} from '@react-navigation/native'
import {useState, useCallback} from 'react'
import type {
  ParkingPermitScope,
  SecureParkingAccount,
} from '@/modules/parking/types'
import {getSecureParkingAccount} from '@/modules/parking/utils/getSecureParkingAccount'

export const useGetSecureParkingAccount = (
  reportCode: string,
  scope: ParkingPermitScope,
) => {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [secureAccount, setSecureAccount] = useState<
    SecureParkingAccount | undefined
  >(undefined)

  const getSecureAccount = useCallback(async () => {
    setIsError(false)
    setIsLoading(true)

    try {
      const account = await getSecureParkingAccount(reportCode, scope)

      setSecureAccount(account)
    } catch {
      setIsError(true)
      setSecureAccount(undefined)
    } finally {
      setIsLoading(false)
    }
  }, [reportCode, scope])

  useFocusEffect(
    useCallback(() => {
      void getSecureAccount()
    }, [getSecureAccount]),
  )

  return {secureAccount, isError, isLoading}
}
