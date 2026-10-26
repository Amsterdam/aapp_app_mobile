import {useCallback} from 'react'
import {FormProvider, useForm, type SubmitHandler} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {EmailTextInputField} from '@/components/ui/forms/input/EmailTextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/boat-charging/alerts'
import {useOpenIdConnect} from '@/modules/boat-charging/hooks/useOpenIdConnect'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {setBoatChargingTemporaryUsername} from '@/modules/boat-charging/slice'
import {resetPasswordWithOpenIdConnect} from '@/modules/boat-charging/utils/openIdConnect'
import {useAlert} from '@/store/slices/alert'

type FormValues = {
  username: string
}

export const BoatChargingForgotPasswordForm = () => {
  const {openIdConnectConfig} = useOpenIdConnect()
  const {resetAlert, setAlert} = useAlert()
  const dispatch = useDispatch()
  const {navigate} = useNavigation()

  const resetPassword = useCallback(
    async (username: string) => {
      if (openIdConnectConfig) {
        await resetPasswordWithOpenIdConnect(username, openIdConnectConfig)

        dispatch(setBoatChargingTemporaryUsername(username))
        navigate(BoatChargingRouteName.forgotPasswordNewPassword)
      } else {
        throw new Error('OpenID Connect config is not available')
      }
    },
    [dispatch, navigate, openIdConnectConfig],
  )
  const form = useForm<FormValues>()

  const handleForgotPassword: SubmitHandler<FormValues> = useCallback(
    async ({username}) => {
      resetAlert()

      try {
        await resetPassword(username)
      } catch {
        setAlert(alerts.forgotPasswordFailed)
      }
    },
    [resetAlert, setAlert, resetPassword],
  )

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        <Column gutter="lg">
          <Paragraph>
            Vul uw e-mailadres in. U ontvangt een e-mail om uw wachtwoord
            opnieuw in te stellen.
          </Paragraph>
          <EmailTextInputField<'username'>
            label="E-mailadres"
            name="username"
            onSubmitEditing={form.handleSubmit(handleForgotPassword)}
            required
            testID="BoatChargingForgotPasswordFormEmailTextInputField"
          />
        </Column>
        <Button
          isLoading={form.formState.isSubmitting}
          label="Code sturen"
          onPress={form.handleSubmit(handleForgotPassword)}
          testID="BoatChargingForgotPasswordFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
