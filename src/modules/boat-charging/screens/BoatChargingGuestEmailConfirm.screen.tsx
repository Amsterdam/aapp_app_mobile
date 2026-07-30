import {useCallback} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useInitSession} from '@/modules/boat-charging/hooks/useInitSession'
import {useNewSessionFormValues} from '@/modules/boat-charging/slice'

export const BoatChargingGuestEmailConfirmScreen = () => {
  const navigation = useNavigation()
  const {email, setDidVerifyEmail} = useNewSessionFormValues()

  const {onPress} = useInitSession()

  const onButtonPress = useCallback(() => {
    setDidVerifyEmail(true)

    return onPress()
  }, [onPress, setDidVerifyEmail])

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
              onPress={() => {
                setDidVerifyEmail(false)
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
          onPress={onButtonPress}
          testID="BoatChargingGuestEmailConfirmSubmitButton"
        />
      </Box>
    </Screen>
  )
}
