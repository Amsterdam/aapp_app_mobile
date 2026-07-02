import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

type Props =
  NavigationProps<BoatChargingRouteName.boatChargingGuestEmailConfirm>

export const BoatChargingGuestEmailConfirmScreen = ({route}: Props) => {
  const navigation = useNavigation()

  return (
    <Screen testID="BoatChargingGuestEmailConfirmScreen">
      <Box grow>
        <Column gutter="xl">
          <Paragraph>
            Wij sturen een link van uw laadsessie en het betaalbewijs naar:
          </Paragraph>
          <Column>
            <Title
              level="h4"
              text={route.params.email}
              textAlign="center"
            />
            <NavigationButton
              chevronSize="md"
              emphasis="default"
              horizontallyAlign="center"
              onPress={() => navigation.goBack()}
              testID="BoatChargingGuestEmailConfirmScreenChangeEmailAddressButton"
              title="Wijzig e-mailadres"
            />
          </Column>
        </Column>

        <Button
          label="Ja, dit klopt"
          marginTop="auto"
          onPress={() =>
            navigation.navigate(
              BoatChargingRouteName.boatChargingTermsAndConditions,
              {...route.params},
            )
          }
          testID="BoatChargingGuestEmailConfirmSubmitButton"
        />
      </Box>
    </Screen>
  )
}
