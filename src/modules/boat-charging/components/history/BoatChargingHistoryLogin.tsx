import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {RedirectKey} from '@/modules/redirects/types'

export const BoatChargingHistoryLogin = () => {
  const {navigate} = useNavigation()

  return (
    <Column gutter="xl">
      <Column gutter="md">
        <Title
          level="h2"
          testID="BoatChargingHistoryLoginTitle"
          text="Log in voor uw laadgeschiedenis "
        />
        <Paragraph>Overzicht van uw laadsessies en kosten.</Paragraph>
      </Column>
      <Column gutter="lg">
        <Button
          label="Inloggen"
          onPress={() => navigate(BoatChargingRouteName.boatChargingLogin)}
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
