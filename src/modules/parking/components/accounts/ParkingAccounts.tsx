import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {ParkingAccountsByScope} from '@/modules/parking/components/accounts/ParkingAccountsByScope'
import {useParkingAccounts} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingAccounts = () => {
  const parkingAccounts = useParkingAccounts()
  const permitHolderAccounts = Object.values(parkingAccounts).filter(
    account => account.scope === ParkingPermitScope.permitHolder,
  )
  const visitorAccounts = Object.values(parkingAccounts).filter(
    account => account.scope === ParkingPermitScope.visitor,
  )

  if (!permitHolderAccounts.length && !visitorAccounts.length) {
    return (
      <Paragraph testID="ParkingAccountsNoAccountsParagraph">
        Er zijn nog geen parkeeraccounts toegevoegd. Log in om parkeeraccounts
        toe te voegen.
      </Paragraph>
    )
  }

  return (
    <Column gutter="lg">
      {!!permitHolderAccounts.length && (
        <ParkingAccountsByScope
          accounts={permitHolderAccounts}
          scope={ParkingPermitScope.permitHolder}
        />
      )}
      {!!visitorAccounts.length && (
        <ParkingAccountsByScope
          accounts={visitorAccounts}
          scope={ParkingPermitScope.visitor}
        />
      )}
    </Column>
  )
}
