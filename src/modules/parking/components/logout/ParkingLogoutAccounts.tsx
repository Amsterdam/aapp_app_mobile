import {Column} from '@/components/ui/layout/Column'
import {ParkingLogoutAccountList} from '@/modules/parking/components/logout/ParkingLogoutAccountList'
import {useParkingAccounts} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingLogoutAccounts = () => {
  const parkingAccounts = useParkingAccounts()
  const permitHolderAccounts = Object.values(parkingAccounts).filter(
    account => account.scope === ParkingPermitScope.permitHolder,
  )
  const visitorAccounts = Object.values(parkingAccounts).filter(
    account => account.scope === ParkingPermitScope.visitor,
  )

  return (
    <Column gutter="lg">
      {!!permitHolderAccounts.length && (
        <ParkingLogoutAccountList
          accounts={permitHolderAccounts}
          scope={ParkingPermitScope.permitHolder}
        />
      )}
      {!!visitorAccounts.length && (
        <ParkingLogoutAccountList
          accounts={visitorAccounts}
          scope={ParkingPermitScope.visitor}
        />
      )}
    </Column>
  )
}
