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

  return (
    <Column gutter="xl">
      <Box variant="distinct">
        <Column gutter="md">
          <Column>
            <Title
              level="h2"
              testID="ParkingAccountDetailTitle"
              text={reportCode}
            />
            <Phrase color="secondary">Meldcode - Mijn account</Phrase>
          </Column>
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
