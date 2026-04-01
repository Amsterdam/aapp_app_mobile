import {useCallback, useEffect} from 'react'
import type {ParkingAccount} from '@/modules/parking/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAddSecureParkingAccountName} from '@/modules/parking/hooks/useAddSecureParkingAccountName'
import {parkingSlice, useParkingAccounts} from '@/modules/parking/slice'

/**
 * This hook transfers Parking V1 account.name entries from the Redux Store to Secure Storage
 */
export const useTransferReduxAccountNameToSecureStorage = () => {
  const addSecureParkingAccountName = useAddSecureParkingAccountName()
  const dispatch = useDispatch()

  const rawAccounts = useParkingAccounts()

  const transfer = useCallback(
    async (accounts: Record<string, ParkingAccount & {name?: string}>) => {
      if (Object.values(accounts).every(account => !account.name)) {
        return
      }

      await Promise.all(
        Object.values(accounts).map(account => {
          if (account.name) {
            return addSecureParkingAccountName(account, account.name)
          }

          return Promise.resolve()
        }),
      )

      dispatch(parkingSlice.actions.removeNamesFromParkingAccount())
    },
    [addSecureParkingAccountName, dispatch],
  )

  useEffect(() => {
    if (!rawAccounts) {
      return
    }

    void transfer(rawAccounts)
  }, [transfer, rawAccounts])
}
