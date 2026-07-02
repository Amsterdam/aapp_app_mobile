import {useEffect, useRef} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Platform} from 'react-native'
import type {TextInput} from 'react-native-gesture-handler'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {FieldType} from '@/components/ui/forms/input/types'
import {Column} from '@/components/ui/layout/Column'
import {ExternalInlineLink} from '@/components/ui/text/ExternalInlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/parking/alerts'
import {tagTypes} from '@/modules/parking/constants'
import {useAddSecureParkingAccount} from '@/modules/parking/hooks/useAddSecureParkingAccount'
import {ParkingRouteName} from '@/modules/parking/routes'
import {parkingApi, useLoginParkingMutation} from '@/modules/parking/service'
import {
  parkingSlice,
  setIsLoggingIn,
  useParkingAccessToken,
  useParkingAccounts,
  useParkingDeeplinkAccount,
} from '@/modules/parking/slice'
import {ParkingAccountLogin} from '@/modules/parking/types'
import {getLoginFailedAlert} from '@/modules/parking/utils/getLoginFailedAlert'
import {RedirectKey} from '@/modules/redirects/types'
import {devError} from '@/processes/development'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {useAlert} from '@/store/slices/alert'

export const ParkingLoginForm = () => {
  const deeplinkAccount = useParkingDeeplinkAccount()
  const form = useForm<ParkingAccountLogin>({defaultValues: deeplinkAccount})
  const pincodeRef = useRef<TextInput | null>(null)
  const {setAccessToken} = useParkingAccessToken()
  const {resetAlert, setAlert} = useAlert()
  const trackException = useTrackException()
  const accounts = useParkingAccounts()

  const {handleSubmit, setValue} = form
  const [loginParking, {error, isError, isLoading}] = useLoginParkingMutation()
  const setSecureParkingAccount = useAddSecureParkingAccount()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const onSubmit = handleSubmit(async ({pin, reportCode}) => {
    try {
      const {access_token, access_token_expiration, scope} = await loginParking(
        {
          pin,
          report_code: reportCode,
        },
      ).unwrap()

      await setSecureParkingAccount({pin, reportCode}, scope)
      setAccessToken(reportCode, access_token, access_token_expiration)
      dispatch(parkingSlice.actions.setCurrentAccount(reportCode))
      dispatch(parkingSlice.actions.setCurrentPermitReportCode(undefined))
      dispatch(parkingSlice.actions.setParkingAccount({reportCode, scope}))
      dispatch(parkingApi.util.invalidateTags([...tagTypes]))
      dispatch(setIsLoggingIn(false))

      if (Object.keys(accounts).length) {
        setAlert(alerts.changeParkingPermitAliasInfo)
      }
    } catch (err) {
      trackException(
        ExceptionLogKey.parkingLoginFailed,
        'ParkingLoginForm.tsx',
        {
          error: err,
        },
      )
      devError('ParkingLoginForm onSubmit error:', err)
    }
  })

  useEffect(() => {
    if (deeplinkAccount) {
      setValue('reportCode', deeplinkAccount.reportCode)
      setValue('pin', deeplinkAccount.pin)
    }
  }, [deeplinkAccount, setValue])

  useEffect(() => {
    if (!isError) {
      return
    }

    const alert = getLoginFailedAlert(error)

    if (alert) {
      if (alert === alerts.loginAccountInactiveFailed) {
        navigation.navigate(ParkingRouteName.accountInactive)
      } else {
        setAlert(alert)
      }
    }
  }, [isError, error, setAlert, navigation])

  useEffect(() => {
    if (isLoading) {
      resetAlert()
    }
  }, [isLoading, resetAlert])

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        <Column gutter="xl">
          <Column gutter="md">
            <TextInputField
              hasClearButton={false}
              keyboardType="numbers-and-punctuation"
              label="Meldcode"
              name="reportCode"
              onSubmitEditing={() => {
                pincodeRef.current?.focus()
              }}
              returnKeyType={Platform.OS === 'android' ? 'done' : undefined}
              rules={{
                required: 'Vul een meldcode in',
              }}
              submitBehavior="submit"
              testID="ParkingLoginFormReportCodeInputField"
              textTransform={text =>
                text.replaceAll(/[^a-zA-Z0-9]/g, '').toUpperCase()
              }
            />
            <TextInputField
              fieldType={FieldType.pin}
              hasClearButton={false}
              label="Pincode"
              name="pin"
              onSubmitEditing={onSubmit}
              ref={pincodeRef}
              rules={{
                required: 'Vul een pincode in',
              }}
              testID="ParkingLoginFormPinCodeInputField"
            />
          </Column>

          <Button
            isLoading={form.formState.isSubmitting}
            label="Inloggen"
            onPress={onSubmit}
            testID="ParkingLoginFormSubmitButton"
          />
        </Column>

        <Column gutter="sm">
          <Paragraph>
            U vindt uw meldcode en pincode in{' '}
            <ExternalInlineLink
              redirectKey={RedirectKey.my_parking}
              testID="ParkingLoginFormInlineLink">
              Mijn Parkeren
            </ExternalInlineLink>
          </Paragraph>
          <Paragraph>
            Bent u op bezoek? Vraag de meldcode en pincode van het
            bezoekersaccount aan de persoon die u bezoekt.
          </Paragraph>
        </Column>
      </Column>
    </FormProvider>
  )
}
