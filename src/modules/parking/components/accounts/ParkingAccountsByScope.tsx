import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingAccountLink} from '@/modules/parking/components/accounts/ParkingAccountLink'
import {type ParkingAccount, ParkingPermitScope} from '@/modules/parking/types'

type Props = {
  accounts: ParkingAccount[]
  scope: ParkingPermitScope
}

export const ParkingAccountsByScope = ({accounts, scope}: Props) => {
  const isPermitHolder = scope === ParkingPermitScope.permitHolder

  return (
    <Column gutter="sm">
      <Box insetLeft="md">
        <Title
          level="h5"
          text={isPermitHolder ? 'Mijn accounts' : 'Bezoekersaccounts'}
        />
      </Box>
      <Column gutter="xs">
        {accounts.map(account => (
          <ParkingAccountLink
            account={account}
            key={account.reportCode}
          />
        ))}
      </Column>
    </Column>
  )
}
