import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ParkingRouteName} from '@/modules/parking/routes'
import {RedirectKey} from '@/modules/redirects/types'

type Props = NavigationProps<ParkingRouteName.accountInactive>

export const ParkingAccountInactiveScreen = ({navigation}: Props) => (
  <Screen testID="ParkingAccountInactiveScreen">
    <Box>
      <Column gutter="xl">
        <Column gutter="md">
          <Title
            level="h2"
            text="Deze meldcode werkt niet meer"
          />
          <Paragraph>
            U logt nu in met een oude meldcode. U vindt uw nieuwe meldcode en
            pincode in Mijn Parkeren.
          </Paragraph>
        </Column>
        <Column gutter="md">
          <ExternalLinkButton
            label="Ga naar Mijn Parkeren"
            redirectKey={RedirectKey.my_parking}
            testID="ParkingAccountInactiveMyParkingButton"
          />
          <Button
            label="Opnieuw inloggen"
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack()
              } else {
                navigation.navigate(ParkingRouteName.login)
              }
            }}
            testID="ParkingAccountInactiveRetryLoginButton"
            variant="secondary"
          />
        </Column>
      </Column>
    </Box>
  </Screen>
)
