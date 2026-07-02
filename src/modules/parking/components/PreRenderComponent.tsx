import {useCallback, useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {parkingSlice, useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope, SecureParkingAccount} from '@/modules/parking/types'
import {parseSecureParkingAccounts} from '@/modules/parking/utils/parseSecureParkingAccounts'
import {getSecureItem, SecureItemKey} from '@/utils/secureStorage'

/**
 * Component to pre-render parking account information.
 * It retrieves the secure parking account and sets it in the Redux store.
 */
export const PreRenderComponent = () => {
  const dispatch = useDispatch()
  const account = useParkingAccount()

  const setParkingAccount = useCallback(async () => {
    const permitHolderRaw = await getSecureItem(
      SecureItemKey.parkingPermitHolder,
    )
    const visitorRaw = await getSecureItem(SecureItemKey.parkingVisitor)

    const permitHolders = parseSecureParkingAccounts(permitHolderRaw)
    const visitors = parseSecureParkingAccounts(visitorRaw)

    const dispatchAccounts = (
      accounts: SecureParkingAccount[],
      scope: ParkingPermitScope,
    ) => {
      accounts.forEach(a => {
        dispatch(
          parkingSlice.actions.setParkingAccount({
            reportCode: a.reportCode,
            scope,
          }),
        )
      })
    }

    dispatchAccounts(permitHolders, ParkingPermitScope.permitHolder)
    dispatchAccounts(visitors, ParkingPermitScope.visitor)

    const currentAccount = permitHolders[0] ?? visitors[0]

    if (currentAccount) {
      dispatch(
        parkingSlice.actions.setCurrentAccount(currentAccount.reportCode),
      )
    }
  }, [dispatch])

  useEffect(() => {
    if (!account) {
      void setParkingAccount()
    }
  }, [account, setParkingAccount])

  return null
}
