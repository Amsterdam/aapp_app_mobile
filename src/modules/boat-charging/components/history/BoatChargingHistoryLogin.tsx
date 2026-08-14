import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {setPendingScreen} from '@/modules/boat-charging/slice'
import {RedirectKey} from '@/modules/redirects/types'

export const BoatChargingHistoryLogin = () => {
  const {navigate} = useNavigation()
  const dispatch = useDispatch()

  return (
    <Column gutter="xl">
      <Column gutter="md">
        <Title
          level="h2"
          testID="BoatChargingHistoryLoginTitle"
          text="Log in voor uw laadgeschiedenis"
        />
        <Paragraph>Overzicht van uw laadsessies en kosten.</Paragraph>
      </Column>
      <Column gutter="lg">
        <Button
          label="Inloggen"
          onPress={() => {
            dispatch(setPendingScreen([BoatChargingRouteName.history]))
            navigate(BoatChargingRouteName.login)
          }}
          testID="BoatChargingHistoryLoginButton"
        />
        <ExternalLinkButton
          label="Account aanmaken"
          redirectKey={RedirectKey.boatChargingCreateAccount}
          testID="BoatChargingLoginFormCreateAccountButton"
          variant="secondary"
        />
      </Column>
    </Column>
  )
}
