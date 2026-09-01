import {useCallback, useRef} from 'react'
import {FormProvider, useForm, type SubmitHandler} from 'react-hook-form'
import type {TextInput as TextInputRN} from 'react-native-gesture-handler'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {EmailTextInputField} from '@/components/ui/forms/input/EmailTextInputField'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {FieldType} from '@/components/ui/forms/input/types'
import {Column} from '@/components/ui/layout/Column'
import {alerts} from '@/modules/boat-charging/alerts'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'
import {RedirectKey} from '@/modules/redirects/types'
import {useAlert} from '@/store/slices/alert'

type FormValues = {
  password: string
  username: string
}

export const BoatChargingLoginForm = () => {
  const {signIn} = useOpenIdConnectAuth()
  const form = useForm<FormValues>()
  const passwordInputReference = useRef<TextInputRN>(null)

  const {resetAlert, setAlert} = useAlert()

  const handleSignIn: SubmitHandler<FormValues> = useCallback(
    async ({username, password}) => {
      resetAlert()

      try {
        await signIn(username, password)
      } catch {
        setAlert(alerts.loginFailed)
      }
    },
    [resetAlert, setAlert, signIn],
  )

  return (
    <FormProvider {...form}>
      <Box>
        <Column gutter="xl">
          <Column gutter="lg">
            <EmailTextInputField<'username'>
              label="Gebruikersnaam"
              name="username"
              onSubmitEditing={() => passwordInputReference.current?.focus()}
              required
              testID="BoatChargingLoginFormEmailTextInputField"
            />
            <TextInputField
              autoCapitalize="none"
              autoCorrect={false}
              fieldType={FieldType.password}
              label="Wachtwoord"
              name="password"
              onSubmitEditing={form.handleSubmit(handleSignIn)}
              ref={passwordInputReference}
              required
              testID="BoatChargingLoginFormPasswordInputField"
            />
          </Column>
          <Button
            isLoading={form.formState.isSubmitting}
            label="Inloggen"
            onPress={form.handleSubmit(handleSignIn)}
            testID="BoatChargingLoginFormSubmitButton"
          />
          <Column gutter="sm">
            <ExternalLinkButton
              label="Wachtwoord vergeten?"
              redirectKey={RedirectKey.boatChargingForgotPassword}
              testID="BoatChargingLoginFormForgotPasswordButton"
              variant="tertiary"
            />
            <ExternalLinkButton
              label="Account aanmaken"
              redirectKey={RedirectKey.boatChargingCreateAccount}
              testID="BoatChargingLoginFormCreateAccountButton"
              variant="tertiary"
            />
          </Column>
        </Column>
      </Box>
    </FormProvider>
  )
}
