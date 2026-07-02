import {useCallback, useRef} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import type {ChargingStation} from '@/modules/boat-charging/types'
import type {TextInput as TextInputRN} from 'react-native-gesture-handler'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {EmailTextInputField} from '@/components/ui/forms/input/EmailTextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {RedirectKey} from '@/modules/redirects/types'

export const BoatChargingGuestEmailForm = ({
  socketId,
}: {
  socketId: ChargingStation['id']
}) => {
  const form = useForm<{email: string}>()
  const emailRef = useRef<TextInputRN>(null)

  const {navigate} = useNavigation()

  const onSubmit = useCallback(
    ({email}: {email: string}) => {
      navigate(BoatChargingRouteName.boatChargingGuestEmailConfirm, {
        email: email.trim(),
        socketId,
      })
    },
    [socketId, navigate],
  )

  useFocusAndForegroundEffect(() => emailRef.current?.focus(), [])

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        <Column gutter="lg">
          <Paragraph>
            U ontvangt een link naar uw laadsessie en het betaalbewijs.
          </Paragraph>

          <EmailTextInputField<'email'>
            name="email"
            onSubmitEditing={form.handleSubmit(onSubmit)}
            ref={emailRef}
            required
            testID="BoatChargingGuestEmailTextInputField"
          />
        </Column>

        <Column gutter="lg">
          <Button
            label="Verder met opladen"
            onPress={form.handleSubmit(onSubmit)}
            testID="BoatChargingGuestEmailFormSubmitButton"
          />
          <Button
            label="Inloggen"
            onPress={() => navigate(BoatChargingRouteName.boatChargingLogin)}
            testID="BoatChargingGuestEmailFormLoginButton"
            variant="secondary"
          />
          <ExternalLinkButton
            label="Account aanmaken"
            redirectKey={RedirectKey.boatChargingCreateAccount}
            testID="BoatChargingLoginFormCreateAccountButton"
            variant="tertiary"
          />
        </Column>
      </Column>
    </FormProvider>
  )
}
