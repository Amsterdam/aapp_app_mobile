import type {NavigateTo} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useAccessCodePendingScreen} from '@/modules/access-code/hooks/useAccessCodePendingScreen'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

type Props = {pendingScreen: NavigateTo; text: string; title: string}

export const BoatChargingLoginRegister = ({
  title,
  text,
  pendingScreen,
}: Props) => {
  const {navigate} = useNavigation()
  const {setPendingScreen} = useAccessCodePendingScreen()

  return (
    <Column gutter="xl">
      <Column gutter="md">
        <Title
          level="h2"
          testID="BoatChargingLoginRegisterTitle"
          text={title}
        />
        <Paragraph>{text}</Paragraph>
      </Column>
      <Column gutter="lg">
        <Button
          label="Inloggen"
          onPress={() => {
            setPendingScreen(pendingScreen)
            navigate(BoatChargingRouteName.login)
          }}
          testID="BoatChargingLoginRegisterLoginButton"
        />
        <Button
          label="Account aanmaken"
          onPress={() => {
            setPendingScreen(pendingScreen)
            navigate(BoatChargingRouteName.createAccount)
          }}
          testID="BoatChargingLoginRegisterCreateAccountButton"
          variant="tertiary"
        />
      </Column>
    </Column>
  )
}
