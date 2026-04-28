import type {ParkingAccount} from '@/modules/parking/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {ParkingRouteName} from '@/modules/parking/routes'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  account: ParkingAccount
}

export const ParkingAccountLink = ({account}: Props) => {
  const {reportCode, scope} = account
  const {navigate} = useNavigation()
  const {secureAccount, isError, isLoading} = useGetSecureParkingAccount(
    scope,
    reportCode,
  )

  if (isLoading) {
    return null
  }

  if (isError) {
    return <SomethingWentWrong testID="ParkingAccountLinkSomethingWentWrong" />
  }

  return (
    <NavigationButton
      accessibilityLabel={accessibleText(
        `Meldcode ${account.reportCode}`,
        secureAccount?.name ? account.reportCode : 'Naam toevoegen',
      )}
      chevronSize="ml"
      description={secureAccount?.name ? account.reportCode : 'Naam toevoegen'}
      emphasis="default"
      key={account.reportCode}
      onPress={() => {
        navigate(ParkingRouteName.account, {
          reportCode: account.reportCode,
        })
      }}
      testID={`ParkingAccountsByScope-${account.reportCode}NavigationButton`}
      title={secureAccount?.name ?? account.reportCode}
    />
  )
}
