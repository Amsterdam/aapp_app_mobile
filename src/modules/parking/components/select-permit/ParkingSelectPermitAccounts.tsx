import type {Text} from 'react-native'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {ParkingSelectPermitList} from '@/modules/parking/components/select-permit/ParkingSelectPermitList'
import {ParkingPermitScope, type ParkingAccount} from '@/modules/parking/types'

type Props = {
  accounts: Record<string, ParkingAccount>
  focusRef: React.RefObject<Text>
}

export const ParkingSelectPermitAccounts = ({accounts, focusRef}: Props) =>
  Object.entries(accounts)
    .sort(([, a], [, b]) => {
      if (a.scope === b.scope) {
        return 0
      }

      return a.scope === ParkingPermitScope.permitHolder ? -1 : 1
    })
    .map(([reportCodeParkingAccount, account], accountIndex) => (
      <Column
        gutter="no"
        key={`ParkingSelectPermitTitle-${accountIndex}`}>
        {((account.scope === ParkingPermitScope.permitHolder &&
          !!account.name) ||
          account.scope === ParkingPermitScope.visitor) && (
          <Title
            level="h4"
            ref={focusRef}
            testID="ParkingSelectPermitTitle"
            text={
              account.scope === ParkingPermitScope.visitor
                ? 'Bezoekersaccount'
                : (account.name ?? '')
            }
          />
        )}
        <ParkingSelectPermitList
          accountIndex={accountIndex}
          permits={account.permits}
          reportCodeParkingAccount={reportCodeParkingAccount}
          scope={account.scope}
        />
      </Column>
    ))
