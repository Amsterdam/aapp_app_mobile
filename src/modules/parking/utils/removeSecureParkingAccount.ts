import {ReduxDispatch} from '@/hooks/redux/types'
import {ParkingAccountLogin, ParkingPermitScope} from '@/modules/parking/types'
import {deleteSecureItemUpdatedTimestamp} from '@/store/slices/secureStorage'
import {
  getSecureItem,
  SecureItemKey,
  setSecureItem,
} from '@/utils/secureStorage'

const getKey = (scope: ParkingPermitScope) =>
  scope === ParkingPermitScope.permitHolder
    ? SecureItemKey.parkingPermitHolder
    : SecureItemKey.parkingVisitor

export const removeSecureParkingAccount = async (
  accountReportCode: string,
  scope: ParkingPermitScope,
  dispatch: ReduxDispatch,
) => {
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

  currentArr = currentArr.filter(item => item.reportCode !== accountReportCode)

  await setSecureItem(key, JSON.stringify(currentArr))
  dispatch(deleteSecureItemUpdatedTimestamp(key))
}
