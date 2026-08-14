import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {
  BoatChargingInitSessionStep,
  useInitSession,
} from '@/modules/boat-charging/hooks/useInitSession'

export const BoatChargingGuestEmailConfirmScreen = () => {
  const navigation = useNavigation()

  const {
    onPress,
    form: {handleSubmit, watch, setValue},
  } = useInitSession(BoatChargingInitSessionStep.guestEmailConfirm)

  const email = watch('email')

  if (!email) {
    return (
      <SomethingWentWrong
        inset="md"
        testID="BoatChargingGuestEmailConfirmScreenSomethingWentWrong"
      />
    )
  }

  return (
    <Screen
      hasStickyAlert
      testID="BoatChargingGuestEmailConfirmScreen">
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
              onPress={() => {
                setValue('didVerifyEmail', false)
                navigation.goBack()
              }}
              testID="BoatChargingGuestEmailConfirmScreenChangeEmailAddressButton"
              title="Wijzig e-mailadres"
            />
          </Column>
        </Column>

        <Button
          label="Ja, dit klopt"
          marginTop="auto"
          onPress={e => {
            setValue('didVerifyEmail', true)

            return handleSubmit(onPress)(e)
          }}
          testID="BoatChargingGuestEmailConfirmSubmitButton"
        />
      </Box>
    </Screen>
  )
}
