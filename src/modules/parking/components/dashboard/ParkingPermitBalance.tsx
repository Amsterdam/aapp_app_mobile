import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingPermitBalanceMoney} from '@/modules/parking/components/dashboard/ParkingPermitBalanceMoney'
import {ParkingPermitBalanceTime} from '@/modules/parking/components/dashboard/ParkingPermitBalanceTime'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

export const ParkingPermitBalance = () => {
  const currentPermit = useCurrentParkingPermit()

  const parkingAccount = useParkingAccount()

  if (
    !currentPermit.time_balance_applicable &&
    !currentPermit.money_balance_applicable
  ) {
    return null
  }

  return (
    <Column gutter="md">
      <Title
        level="h2"
        text="Uw saldo"
      />
      <ParkingPermitBalanceTime />
      {parkingAccount?.scope === ParkingPermitScope.permitHolder && (
        <ParkingPermitBalanceMoney />
      )}
    </Column>
  )
}
