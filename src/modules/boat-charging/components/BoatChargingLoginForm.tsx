import {useCallback, useRef, useState} from 'react'
import {FormProvider, useForm, type SubmitHandler} from 'react-hook-form'
import type {TextInput as TextInputRN} from 'react-native-gesture-handler'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {FieldType} from '@/components/ui/forms/input/types'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'
import {RedirectKey} from '@/modules/redirects/types'

type FormValues = {
  password: string
  username: string
}

export const BoatChargingLoginForm = () => {
  const {signIn} = useOpenIdConnectAuth()
  const form = useForm<FormValues>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const passwordInputReference = useRef<TextInputRN>(null)

  const handleSignIn: SubmitHandler<FormValues> = useCallback(
    async ({username, password}) => {
      if (!username || !password) {
        setErrorMessage('Vul een gebruikersnaam en wachtwoord in')

        return
      }

      setErrorMessage(null)

      try {
        await signIn(username, password)
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Inloggen is mislukt',
        )
      }
    },
    [signIn],
  )

  return (
    <FormProvider {...form}>
      <Box>
        <Column gutter="xl">
          <Column gutter="lg">
            <TextInputField
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              keyboardType="email-address"
              label="Gebruikersnaam"
              name="username"
              onSubmitEditing={() => passwordInputReference.current?.focus()}
              required
              returnKeyType="next"
              testID="BoatChargingLoginFormUsernameInputField"
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
          {errorMessage ? (
            <Paragraph
              color="warning"
              testID="BoatChargingLoginFormErrorMessage">
              {errorMessage}
            </Paragraph>
          ) : null}
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
