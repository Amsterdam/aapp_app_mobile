import {useCallback} from 'react'
import {useSetSecureItem} from '@/hooks/secureStorage/useSetSecureItem'
import {ParkingPermitScope, ParkingAccountLogin} from '@/modules/parking/types'
import {SecureItemKey, getSecureItem} from '@/utils/secureStorage'
const getKey = (scope: ParkingPermitScope) =>
  scope === ParkingPermitScope.permitHolder
    ? SecureItemKey.parkingPermitHolder
    : SecureItemKey.parkingVisitor

export const useAddSecureParkingAccount = () => {
  const setSecureItem = useSetSecureItem()

  return useCallback(
    async (data: ParkingAccountLogin, scope: ParkingPermitScope) => {
      const key = getKey(scope)
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
                'reportCode' in item &&
                'pin' in item,
            )
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        currentArr = []
      }

      // Remove any existing item with the same reportCode
      currentArr = currentArr.filter(
        item => item.reportCode !== data.reportCode,
      )
      currentArr.push(data)

      await setSecureItem(key, JSON.stringify(currentArr))
    },
    [setSecureItem],
  )
}
