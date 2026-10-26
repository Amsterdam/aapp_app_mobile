import {useCallback, useRef, useState} from 'react'
import {FormProvider, useForm, type SubmitHandler} from 'react-hook-form'
import type {TextInput as TextInputRN} from 'react-native-gesture-handler'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {FieldType} from '@/components/ui/forms/input/types'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {alerts} from '@/modules/boat-charging/alerts'
import {PASSWORD_RULES} from '@/modules/boat-charging/constants/passwordRules'
import {useOpenIdConnect} from '@/modules/boat-charging/hooks/useOpenIdConnect'
import {useOpenIdConnectAuth} from '@/modules/boat-charging/hooks/useOpenIdConnectAuth'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {selectBoatChargingTemporaryUsername} from '@/modules/boat-charging/slice'
import {
  confirmResetPasswordWithOpenIdConnect,
  resetPasswordWithOpenIdConnect,
} from '@/modules/boat-charging/utils/openIdConnect'
import {devError} from '@/processes/development'
import {useAlert} from '@/store/slices/alert'
import {isObjectWithKeys} from '@/utils/isObjectWithKeys'

type FormValues = {
  confirmationCode: string
  password: string
  repeatPassword: string
}

export const BoatChargingForgotPasswordNewPasswordForm = () => {
  const {openIdConnectConfig} = useOpenIdConnect()
  const {signIn} = useOpenIdConnectAuth()
  const {resetAlert, setAlert} = useAlert()
  const username = useSelector(selectBoatChargingTemporaryUsername)
  const navigation = useNavigation()

  const [isResendingCode, setIsResendingCode] = useState(false)
  const resendResetPasswordCode = useCallback(async () => {
    if (!username) {
      setAlert(alerts.checkConfirmCodeFailed)
      navigation.goBack()
    } else if (openIdConnectConfig) {
      try {
        setIsResendingCode(true)
        await resetPasswordWithOpenIdConnect(username, openIdConnectConfig)

        setAlert(alerts.resendConfirmCodeSuccess)
      } catch (error) {
        devError(
          'Error resending sign up code: ',
          isObjectWithKeys(error, {name: 'string'}) ? error.name : '',
          error,
        )
        setAlert(alerts.resendConfirmCodeFailed)
      } finally {
        setIsResendingCode(false)
      }
    } else {
      setAlert(alerts.resendConfirmCodeFailed)
    }
  }, [navigation, openIdConnectConfig, setAlert, username])

  const handleConfirmSignUpError = useCallback(
    async (error: unknown) => {
      if (openIdConnectConfig && isObjectWithKeys(error, {name: 'string'})) {
        switch (error.name) {
          case 'ExpiredCodeException': {
            await resendResetPasswordCode()
            setAlert(alerts.confirmCodeExpiredFailed)
            break
          }

          case 'CodeMismatchException': {
            setAlert(alerts.confirmCodeMismatchFailed)
            break
          }

          default: {
            devError('Unknown case: ', error.name, error)
            setAlert(alerts.checkConfirmCodeFailed)
            break
          }
        }
      } else {
        setAlert(alerts.checkConfirmCodeFailed)
      }
    },
    [openIdConnectConfig, resendResetPasswordCode, setAlert],
  )

  const confirmResetPassword = useCallback(
    async (confirmationCode: string, password: string) => {
      if (!username) {
        setAlert(alerts.checkConfirmCodeFailed)
        navigation.goBack()
      } else if (openIdConnectConfig) {
        try {
          await confirmResetPasswordWithOpenIdConnect(
            username,
            password,
            confirmationCode,
            openIdConnectConfig,
          )

          try {
            await signIn(username, password)
          } catch {
            setAlert(alerts.loginFailed)
            navigation.navigate(BoatChargingRouteName.login)
          }
        } catch (error) {
          await handleConfirmSignUpError(error)
        }
      } else {
        throw new Error('OpenID Connect config is not available')
      }
    },
    [
      handleConfirmSignUpError,
      navigation,
      openIdConnectConfig,
      setAlert,
      signIn,
      username,
    ],
  )
  const form = useForm<FormValues>()
  const passwordInputReference = useRef<TextInputRN>(null)
  const repeatPasswordInputReference = useRef<TextInputRN>(null)

  const handleForgotPasswordConfirm: SubmitHandler<FormValues> = useCallback(
    async ({confirmationCode, password}) => {
      resetAlert()

      try {
        await confirmResetPassword(confirmationCode, password)
      } catch {
        setAlert(alerts.checkConfirmCodeFailed)
      }
    },
    [resetAlert, setAlert, confirmResetPassword],
  )

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        <Column gutter="lg">
          <Title text="We hebben u een e-mail gestuurd" />
          <Paragraph>
            Vul de bevestigingscode in die we hebben gestuurd naar {username}.
            Dit kan een paar minuten duren.
          </Paragraph>
          <TextInputField<FormValues>
            label="Bevestigingscode"
            name="confirmationCode"
            onSubmitEditing={() => passwordInputReference.current?.focus()}
            required
            testID="BoatChargingForgotPasswordNewPasswordFormConfirmationCodeInputField"
          />

          <TextInputField<FormValues, 'password'>
            autoCapitalize="none"
            autoCorrect={false}
            fieldType={FieldType.password}
            label="Nieuw wachtwoord"
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
            testID="BoatChargingForgotPasswordNewPasswordFormPasswordInputField"
          />
          <TextInputField<FormValues, 'repeatPassword'>
            autoCapitalize="none"
            autoCorrect={false}
            fieldType={FieldType.password}
            label="Herhaal nieuw wachtwoord"
            name="repeatPassword"
            onSubmitEditing={form.handleSubmit(handleForgotPasswordConfirm)}
            ref={repeatPasswordInputReference}
            required
            rules={{
              validate: (value, context) => {
                const password = context.password

                return value === password || 'Wachtwoorden zijn niet hetzelfde'
              },
            }}
            testID="BoatChargingForgotPasswordNewPasswordFormRepeatPasswordInputField"
          />
        </Column>
        <Column gutter="md">
          <Button
            isLoading={form.formState.isSubmitting}
            label="Bevestigen"
            onPress={form.handleSubmit(handleForgotPasswordConfirm)}
            testID="BoatChargingForgotPasswordNewPasswordSubmitButton"
          />
          <Button
            isLoading={isResendingCode}
            label="Nieuwe code sturen"
            onPress={resendResetPasswordCode}
            testID="BoatChargingForgotPasswordNewPasswordResendCodeButton"
            variant="secondary"
          />
        </Column>
      </Column>
    </FormProvider>
  )
}
