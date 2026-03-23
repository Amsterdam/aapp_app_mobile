import {useCallback} from 'react'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {
  type ParkingAccount,
  type ParkingAccountLogin,
  ParkingPermitScope,
} from '@/modules/parking/types'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

const getKey = (scope: ParkingPermitScope) =>
  scope === ParkingPermitScope.permitHolder
    ? SecureItemKey.parkingPermitHolder
    : SecureItemKey.parkingVisitor

export const useAddSecureParkingAccountName = () => {
  const setSecureItem = useSetSecureItem()

  return useCallback(
    async (parkingAccount: ParkingAccount, name: string) => {
      const key = getKey(parkingAccount.scope)
      let accounts: ParkingAccountLogin[] = []

      try {
        const existing = await getSecureItem(key)

        if (existing) {
          let parsed: unknown

          try {
            parsed = JSON.parse(existing)
          } catch {
            parsed = []
          }

          if (Array.isArray(parsed)) {
            accounts = parsed.filter(
              (item): item is ParkingAccountLogin =>
                typeof item === 'object' &&
                item !== null &&
                'reportCode' in item &&
                'pin' in item,
            )
          }
        }
      } catch (e) {
        accounts = []
      }

      const hasExistingAccount = accounts.some(
        item => item.reportCode === parkingAccount.reportCode,
      )

      if (!hasExistingAccount) {
        return
      }

      const account = accounts.map(item =>
        item.reportCode === parkingAccount.reportCode ? {...item, name} : item,
      )

      await setSecureItem(key, JSON.stringify(account))
    },
    [setSecureItem],
  )
}
