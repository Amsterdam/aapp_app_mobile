import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useGuestSessionFormValues} from '@/modules/boat-charging/slice'

export const BoatChargingGuestEmailConfirmScreen = () => {
  const navigation = useNavigation()
  const {email} = useGuestSessionFormValues()

  if (!email) {
    return (
      <SomethingWentWrong testID="BoatChargingGuestEmailConfirmScreenSomethingWentWrong" />
    )
  }

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
              text={email}
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
            )
          }
          testID="BoatChargingGuestEmailConfirmSubmitButton"
        />
      </Box>
    </Screen>
  )
}
