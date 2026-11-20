import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {EmailTextInputField} from '@/components/ui/forms/input/EmailTextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {ExternalInlineLink} from '@/components/ui/text/ExternalInlineLink'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {useAccessCodePendingScreen} from '@/modules/access-code/exports/useAccessCodePendingScreen'
import {useInitSession} from '@/modules/boat-charging/hooks/useInitSession'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useSessionDraft} from '@/modules/boat-charging/slice'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {RedirectKey} from '@/modules/redirects/exports/RedirectKey'

export const BoatChargingGuestEmailForm = () => {
  const navigation = useNavigation()
  const {setPendingScreen} = useAccessCodePendingScreen()
  const {setSessionDraft, clearSessionDraft} = useSessionDraft()

  const {
    onPress,
    form: {handleSubmit, getValues},
  } = useInitSession(BoatChargingRouteName.guestEmail)

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
    } else if (navigation.isFocused()) {
      clearSessionDraft()
    }
  }, [isLoggedIn, navigation, clearSessionDraft])

  return (
    <Column gutter="xl">
      <Column gutter="lg">
        <Row gutter="sm">
          <Paragraph>Heeft u al een account?</Paragraph>
          <InlineLink
            onPress={() => {
              setSessionDraft(getValues())
              setPendingScreen([BoatChargingRouteName.chooseVignette])
              navigation.navigate(BoatChargingRouteName.login)
            }}
            testID="BoatChargingGuestEmailFormLoginNavigationButton"
            variant="internal">
            Inloggen
          </InlineLink>
        </Row>

        <EmailTextInputField<'email'>
          disabled={isLoggedIn}
          hasClearButton={false}
          inputInstructions="U ontvangt een link naar uw laadsessie en het betaalbewijs."
          name="email"
          onSubmitEditing={handleSubmit(onSubmit)}
          required
          testID="BoatChargingGuestEmailTextInputField"
        />
        <ExternalInlineLink
          redirectKey={RedirectKey.boatChargingPrivacyStatement}
          testID="BoatChargingGuestEmailFormPrivacyStatementExternalLink">
          Bekijk de privacyverklaring
        </ExternalInlineLink>
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
            setSessionDraft(getValues())
            setPendingScreen([BoatChargingRouteName.verifyVignette, undefined])
            navigation.navigate(BoatChargingRouteName.createAccount)
          }}
          testID="BoatChargingGuestEmailFormCreateAccountButton"
          variant="tertiary"
        />
      </Column>
    </Column>
  )
}
