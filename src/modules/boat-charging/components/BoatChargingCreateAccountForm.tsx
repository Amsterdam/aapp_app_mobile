import {useCallback, useRef} from 'react'
import {FormProvider, useForm, type SubmitHandler} from 'react-hook-form'
import type {TextInput as TextInputRN} from 'react-native-gesture-handler'
import {Button} from '@/components/ui/buttons/Button'
import {EmailTextInputField} from '@/components/ui/forms/input/EmailTextInputField'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {FieldType} from '@/components/ui/forms/input/types'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/boat-charging/alerts'
import {PASSWORD_RULES} from '@/modules/boat-charging/constants/passwordRules'
import {useOpenIdConnect} from '@/modules/boat-charging/hooks/useOpenIdConnect'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {setBoatChargingTemporaryUsername} from '@/modules/boat-charging/slice'
import {signUpWithOpenIdConnect} from '@/modules/boat-charging/utils/openIdConnect'
import {useAlert} from '@/store/slices/alert'
import {isObjectWithKeys} from '@/utils/isObjectWithKeys'

type FormValues = {
  password: string
  repeatPassword: string
  username: string
}

export const BoatChargingCreateAccountForm = () => {
  const {openIdConnectConfig} = useOpenIdConnect()
  const {resetAlert, setAlert} = useAlert()
  const dispatch = useDispatch()
  const {navigate} = useNavigation()

  const signUp = useCallback(
    async (username: string, password: string) => {
      if (openIdConnectConfig) {
        try {
          await signUpWithOpenIdConnect(username, password, openIdConnectConfig)

          dispatch(setBoatChargingTemporaryUsername(username))
          navigate(BoatChargingRouteName.createAccountConfirm)
        } catch (error) {
          if (isObjectWithKeys(error, {name: 'string'})) {
            if (error.name === 'UsernameExistsException') {
              dispatch(setBoatChargingTemporaryUsername(username))
              setAlert(alerts.usernameExistsFailed)
            } else {
              setAlert(alerts.createAccountFailed)
            }
          } else {
            throw error
          }
        }
      } else {
        throw new Error('OpenID Connect config is not available')
      }
    },
    [dispatch, navigate, openIdConnectConfig, setAlert],
  )
  const form = useForm<FormValues>()
  const passwordInputReference = useRef<TextInputRN>(null)
  const repeatPasswordInputReference = useRef<TextInputRN>(null)

  const handleSignUp: SubmitHandler<FormValues> = useCallback(
    async ({username, password}) => {
      resetAlert()

      try {
        await signUp(username, password)
      } catch {
        setAlert(alerts.createAccountFailed)
      }
    },
    [resetAlert, setAlert, signUp],
  )

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        <Column gutter="lg">
          <Paragraph>
            Maak een account aan om sneller een laadsessie te starten en uw
            laadgeschiedenis te bekijken.
          </Paragraph>
          <EmailTextInputField<'username'>
            label="E-mailadres"
            name="username"
            onSubmitEditing={() => passwordInputReference.current?.focus()}
            required
            testID="BoatChargingCreateAccountFormEmailTextInputField"
          />
          <TextInputField<FormValues, 'password'>
            autoCapitalize="none"
            autoCorrect={false}
            fieldType={FieldType.password}
            label="Wachtwoord"
            name="password"
            onSubmitEditing={() =>
              repeatPasswordInputReference.current?.focus()
            }
            ref={passwordInputReference}
            required
            rules={{
              validate: PASSWORD_RULES,
              minLength: {
                value: 8,
                message: 'Wachtwoord moet minimaal 8 tekens bevatten',
              },
            }}
            testID="BoatChargingCreateAccountFormPasswordInputField"
          />
          <TextInputField<FormValues, 'repeatPassword'>
            autoCapitalize="none"
            autoCorrect={false}
            fieldType={FieldType.password}
            label="Herhaal wachtwoord"
            name="repeatPassword"
            onSubmitEditing={form.handleSubmit(handleSignUp)}
            ref={repeatPasswordInputReference}
            required
            rules={{
              validate: (value, context) => {
                const password = context.password

                return value === password || 'Wachtwoorden zijn niet hetzelfde'
              },
            }}
            testID="BoatChargingCreateAccountFormRepeatPasswordInputField"
          />
        </Column>
        <Button
          isLoading={form.formState.isSubmitting}
          label="Account aanmaken"
          onPress={form.handleSubmit(handleSignUp)}
          testID="BoatChargingCreateAccountFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
