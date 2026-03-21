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
    async (account: ParkingAccount, name: string) => {
      const key = getKey(account.scope)
      let currentArr: ParkingAccountLogin[] = []

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
            currentArr = parsed.filter(
              (item): item is ParkingAccountLogin =>
                typeof item === 'object' &&
                item !== null &&
                'reportCode' in item,
            )
          }
        }
      } catch (e) {
        currentArr = []
      }

      const hasExistingAccount = currentArr.some(
        item => item.reportCode === account.reportCode,
      )

      if (!hasExistingAccount) {
        return
      }

      const updatedArr = currentArr.map(item =>
        item.reportCode === account.reportCode ? {...item, name} : item,
      )

      await setSecureItem(key, JSON.stringify(updatedArr))
    },
    [setSecureItem],
  )
}
