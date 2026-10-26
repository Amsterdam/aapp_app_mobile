import {useCallback, useState} from 'react'
import {FormProvider, useForm, type SubmitHandler} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {alerts} from '@/modules/boat-charging/alerts'
import {useOpenIdConnect} from '@/modules/boat-charging/hooks/useOpenIdConnect'
import {useStoreSession} from '@/modules/boat-charging/hooks/useStoreSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {selectBoatChargingTemporaryUsername} from '@/modules/boat-charging/slice'
import {
  resendSignUpCodeWithOpenIdConnect,
  confirmSignUpWithOpenIdConnect,
  getStoredOpenIdConnectSession,
  autoSignInWithOpenIdConnect,
} from '@/modules/boat-charging/utils/openIdConnect'
import {devError} from '@/processes/development'
import {useAlert} from '@/store/slices/alert'
import {isObjectWithKeys} from '@/utils/isObjectWithKeys'

type FormValues = {
  confirmationCode: string
}

export const BoatChargingCreateAccountConfirmForm = () => {
  const {openIdConnectConfig} = useOpenIdConnect()
  const {resetAlert, setAlert} = useAlert()
  const username = useSelector(selectBoatChargingTemporaryUsername)

  const storeSession = useStoreSession()
  const navigation = useNavigation()

  const [isResendingCode, setIsResendingCode] = useState(false)
  const resendSignUpCode = useCallback(async () => {
    if (!username) {
      setAlert(alerts.checkConfirmCodeFailed)
      navigation.goBack()
    } else if (openIdConnectConfig) {
      try {
        setIsResendingCode(true)
        await resendSignUpCodeWithOpenIdConnect(username, openIdConnectConfig)

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
          case 'NotAuthorizedException': {
            try {
              const session =
                await getStoredOpenIdConnectSession(openIdConnectConfig)

              if (session) {
                storeSession(session)
              } else {
                setAlert(alerts.checkConfirmCodeFailed)
              }
            } catch (errorDuringSessionRetrieval) {
              devError(errorDuringSessionRetrieval)
              setAlert(alerts.checkConfirmCodeFailed)
            }

            break
          }

          case 'AutoSignInException': {
            navigation.navigate(BoatChargingRouteName.login)
            break
          }

          case 'ExpiredCodeException': {
            await resendSignUpCode()
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
    [navigation, openIdConnectConfig, resendSignUpCode, setAlert, storeSession],
  )

  const confirmSignUp = useCallback(
    async (confirmationCode: string) => {
      if (!username) {
        setAlert(alerts.checkConfirmCodeFailed)
        navigation.goBack()
      } else if (openIdConnectConfig) {
        try {
          await confirmSignUpWithOpenIdConnect(
            username,
            confirmationCode,
            openIdConnectConfig,
          )

          await autoSignInWithOpenIdConnect(openIdConnectConfig)
          const session =
            await getStoredOpenIdConnectSession(openIdConnectConfig)

          if (session) {
            storeSession(session)
          } else {
            setAlert(alerts.checkConfirmCodeFailed)
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
      storeSession,
      username,
    ],
  )
  const form = useForm<FormValues>()

  const handleConfirm: SubmitHandler<FormValues> = useCallback(
    async ({confirmationCode}) => {
      resetAlert()

      try {
        await confirmSignUp(confirmationCode)
      } catch {
        setAlert(alerts.createAccountFailed)
      }
    },
    [resetAlert, setAlert, confirmSignUp],
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
            onSubmitEditing={form.handleSubmit(handleConfirm)}
            required
            testID="BoatChargingCreateAccountConfirmFormConfirmationCodeInputField"
          />
        </Column>
        <Column gutter="md">
          <Button
            isLoading={form.formState.isSubmitting}
            label="Bevestigen"
            onPress={form.handleSubmit(handleConfirm)}
            testID="BoatChargingCreateAccountConfirmSubmitButton"
          />
          <Button
            isLoading={isResendingCode}
            label="Nieuwe code sturen"
            onPress={resendSignUpCode}
            testID="BoatChargingCreateAccountConfirmResendCodeButton"
            variant="secondary"
          />
        </Column>
      </Column>
    </FormProvider>
  )
}
