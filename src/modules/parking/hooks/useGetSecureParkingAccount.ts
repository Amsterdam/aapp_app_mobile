import {useFocusEffect} from '@react-navigation/native'
import {useState, useCallback} from 'react'
import type {
  ParkingPermitScope,
  SecureParkingAccount,
} from '@/modules/parking/types'
import {getSecureParkingAccount} from '@/modules/parking/utils/getSecureParkingAccount'

export const useGetSecureParkingAccount = (
  scope: ParkingPermitScope,
  reportCode?: string,
) => {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [secureAccount, setSecureAccount] = useState<
    SecureParkingAccount | undefined
  >(undefined)

  const getSecureAccount = useCallback(
    async (accountReportCode: string) => {
      setIsError(false)
      setIsLoading(true)

      try {
        const account = await getSecureParkingAccount(accountReportCode, scope)

        setSecureAccount(account)
      } catch {
        setIsError(true)
        setSecureAccount(undefined)
      } finally {
        setIsLoading(false)
      }
    },
    [scope],
  )

  useFocusEffect(
    useCallback(() => {
      if (!reportCode) {
        return
      }

      void getSecureAccount(reportCode)
    }, [getSecureAccount, reportCode]),
  )

  return {secureAccount, isError, isLoading}
}
