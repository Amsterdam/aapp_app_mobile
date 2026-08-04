import {useCallback, useRef, useState} from 'react'
import {FormProvider, useForm, type SubmitHandler} from 'react-hook-form'
import type {TextInput as TextInputRN} from 'react-native-gesture-handler'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {EmailTextInputField} from '@/components/ui/forms/input/EmailTextInputField'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {FieldType} from '@/components/ui/forms/input/types'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'
import {
  ACCESS_CODE_PENDING_STATES,
  useAccessCodeGateState,
} from '@/modules/access-code/hooks/useAccessCodeGateState'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {RedirectKey} from '@/modules/redirects/types'
import {devLog} from '@/processes/development'

type FormValues = {
  password: string
  username: string
}

export const BoatChargingLoginForm = () => {
  const {signIn} = useOpenIdConnectAuth()
  const form = useForm<FormValues>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const passwordInputReference = useRef<TextInputRN>(null)
  const navigation = useNavigation()
  const {canGoBack, goBack} = navigation

  const {params} = useRoute<BoatChargingRouteName.login>()

  const afterLoginRoute = params?.afterLoginRoute
  const state = useAccessCodeGateState(false)
  const hasNoAccessCode = ACCESS_CODE_PENDING_STATES.has(state)

  const handleSignIn: SubmitHandler<FormValues> = useCallback(
    async ({username, password}) => {
      if (!username || !password) {
        setErrorMessage('Vul een gebruikersnaam en wachtwoord in')

        return
      }

      setErrorMessage(null)

      try {
        await signIn(username, password)

        if (hasNoAccessCode) {
          devLog('SHOULD DO SOMETHING WITH ACCESS CODE')
        }

        if (afterLoginRoute) {
          // @ts-expect-error: afterLoginRoute is a tuple of route name and params, so we can spread it into navigate
          navigation.replace(...afterLoginRoute)
        } else if (canGoBack()) {
          goBack()
        }
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Inloggen is mislukt',
        )
      }
    },
    [afterLoginRoute, canGoBack, goBack, navigation, signIn, hasNoAccessCode],
  )

  return (
    <FormProvider {...form}>
      <Box>
        <Column gutter="xl">
          <Column gutter="lg">
            <EmailTextInputField<'username'>
              autoFocus
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
          {!!errorMessage && (
            <Paragraph
              color="warning"
              testID="BoatChargingLoginFormErrorMessage">
              {errorMessage}
            </Paragraph>
          )}
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
