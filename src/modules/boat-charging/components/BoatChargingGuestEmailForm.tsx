import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {EmailTextInputField} from '@/components/ui/forms/input/EmailTextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {useAccessCodePendingScreen} from '@/modules/access-code/exports/useAccessCodePendingScreen'
import {
  BoatChargingInitSessionStep,
  useInitSession,
} from '@/modules/boat-charging/hooks/useInitSession'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

export const BoatChargingGuestEmailForm = () => {
  const navigation = useNavigation()
  const {setPendingScreen} = useAccessCodePendingScreen()

  const {
    onPress,
    form: {handleSubmit},
  } = useInitSession(BoatChargingInitSessionStep.guestEmail)

  const onSubmit = useCallback(
    (params: NewSessionFormValues) => onPress(params),
    [onPress],
  )
  const {isLoggedIn} = useIsLoggedIn()

  useFocusAndForegroundEffect(() => {
    if (isLoggedIn) {
      // When the user logs in from this flow, and returns to this screen after login,
      // we need to 'reset' the navigation to the module root to render the pending screen.
      navigation.replace(ModuleSlug['boat-charging'])
    }
  }, [isLoggedIn, navigation])

  return (
    <Column gutter="xl">
      <Column gutter="lg">
        <Row gutter="sm">
          <Paragraph>Heeft u al een account?</Paragraph>
          {/* TODO: change this component to the new InlineLink component. https://gemeente-amsterdam.atlassian.net/browse/AM-1132 */}
          <NavigationButton
            chevronSize="md"
            emphasis="default"
            horizontallyAlign="start"
            insetHorizontal="no"
            insetVertical="no"
            onPress={() => {
              setPendingScreen([BoatChargingRouteName.chooseVignet])
              navigation.navigate(BoatChargingRouteName.login)
            }}
            testID="BoatChargingGuestEmailFormLoginNavigationButton"
            title="Inloggen"
          />
        </Row>

        <EmailTextInputField<'email'>
          disabled={isLoggedIn}
          inputInstructions="U ontvangt een link naar uw laadsessie en het betaalbewijs."
          name="email"
          onSubmitEditing={handleSubmit(onSubmit)}
          required
          testID="BoatChargingGuestEmailTextInputField"
        />
      </Column>

      <Column gutter="lg">
        <Button
          label="Verder zonder account"
          onPress={handleSubmit(onSubmit)}
          testID="BoatChargingGuestEmailFormSubmitButton"
        />

        <Button
          label="Account aanmaken"
          onPress={() => {
            setPendingScreen([BoatChargingRouteName.verifyVignet])
            navigation.navigate(BoatChargingRouteName.createAccount)
          }}
          testID="BoatChargingGuestEmailFormCreateAccountButton"
          variant="tertiary"
        />
      </Column>
    </Column>
  )
}
