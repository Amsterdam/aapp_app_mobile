import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {type ParkingAccount, ParkingPermitScope} from '@/modules/parking/types'

type Props = {
  accounts: ParkingAccount[]
  scope: ParkingPermitScope
}

export const ParkingAccountsByScope = ({accounts, scope}: Props) => {
  const {navigate} = useNavigation()
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
        {accounts.map(account => {
          const permit = account.permits?.[0]

          if (!permit) {
            return null
          }

          return (
            <NavigationButton
              chevronSize="ml"
              description="Naam toevoegen"
              emphasis="default"
              key={account.reportCode}
              onPress={() => {
                navigate(ParkingRouteName.account, {
                  reportCode: account.reportCode,
                })
              }}
              testID={`ParkingAccountsByScope-${account.reportCode}NavigationButton`}
              title={account.reportCode}
            />
          )
        })}
      </Column>
    </Column>
  )
}
