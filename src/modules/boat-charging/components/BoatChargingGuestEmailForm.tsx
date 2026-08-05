import {useCallback} from 'react'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {EmailTextInputField} from '@/components/ui/forms/input/EmailTextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {
  BoatChargingInitSessionStep,
  useInitSession,
} from '@/modules/boat-charging/hooks/useInitSession'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {RedirectKey} from '@/modules/redirects/types'

export const BoatChargingGuestEmailForm = () => {
  const {navigate} = useNavigation()

  const {
    onPress,
    form: {handleSubmit},
  } = useInitSession(BoatChargingInitSessionStep.guestEmail)

  const onSubmit = useCallback(
    (params: NewSessionFormValues) => onPress(params),
    [onPress],
  )
  const {isLoggedIn} = useIsLoggedIn()

  return (
    <Column gutter="xl">
      <Column gutter="lg">
        <Paragraph>
          U ontvangt een link naar uw laadsessie en het betaalbewijs.
        </Paragraph>

        <EmailTextInputField<'email'>
          autoFocus
          disabled={isLoggedIn}
          name="email"
          onSubmitEditing={handleSubmit(onSubmit)}
          required={!isLoggedIn}
          testID="BoatChargingGuestEmailTextInputField"
        />
      </Column>

      <Column gutter="lg">
        <Button
          label="Verder met opladen"
          onPress={handleSubmit(onSubmit)}
          testID="BoatChargingGuestEmailFormSubmitButton"
        />
        <Button
          label="Inloggen"
          onPress={() =>
            navigate(BoatChargingRouteName.login, {
              afterLoginRoute: [BoatChargingRouteName.termsAndConditions],
            })
          }
          testID="BoatChargingGuestEmailFormLoginButton"
          variant="secondary"
        />
        <ExternalLinkButton
          label="Account aanmaken"
          redirectKey={RedirectKey.boatChargingCreateAccount}
          testID="BoatChargingGuestEmailFormCreateAccountButton"
          variant="tertiary"
        />
      </Column>
    </Column>
  )
}
