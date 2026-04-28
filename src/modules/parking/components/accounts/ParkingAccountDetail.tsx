import {AccessibilityGroup} from '@/components/features/accessibility/AccessibilityGroup'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingAccountNameForm} from '@/modules/parking/components/accounts/ParkingAccountNameForm'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccounts} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  reportCode?: string
}

export const ParkingAccountDetail = ({reportCode}: Props) => {
  const {navigate} = useNavigation()
  const parkingAccounts = useParkingAccounts()
  const account = reportCode && parkingAccounts?.[reportCode]

  if (!account) {
    return (
      <SomethingWentWrong testID="ParkingAccountDetailSomethingWentWrong" />
    )
  }

  const accountType =
    account.scope === ParkingPermitScope.permitHolder
      ? 'Mijn account'
      : 'Bezoekersaccount'

  return (
    <Column gutter="xl">
      <Box variant="distinct">
        <Column gutter="md">
          <AccessibilityGroup
            accessibilityLabel={accessibleText(
              'Meldcode',
              reportCode,
              accountType,
            )}>
            <Column>
              <Title
                level="h2"
                testID="ParkingAccountDetailTitle"
                text={reportCode}
              />
              <Phrase color="secondary">Meldcode - {accountType}</Phrase>
            </Column>
          </AccessibilityGroup>
          <ParkingAccountNameForm account={account} />
        </Column>
      </Box>
      <Button
        label="Uitloggen"
        onPress={() => navigate(ParkingRouteName.logout, {reportCode})}
        testID="ParkingAccountDetailLogoutButton"
        variant="secondary"
      />
    </Column>
  )
}
