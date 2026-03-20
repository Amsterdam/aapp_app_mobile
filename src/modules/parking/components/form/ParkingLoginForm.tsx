import {useEffect, useRef} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Platform} from 'react-native'
import type {TextInput} from 'react-native-gesture-handler'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {FieldType} from '@/components/ui/forms/input/types'
import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAddSecureParkingAccount} from '@/modules/parking/hooks/useAddSecureParkingAccount'
import {parkingApi, useLoginParkingMutation} from '@/modules/parking/service'
import {
  parkingSlice,
  setIsLoggingIn,
  useParkingAccessToken,
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
  const {openRedirect} = useOpenRedirect()

  const {handleSubmit, setValue} = form
  const [loginParking, {error, isError, isLoading}] = useLoginParkingMutation()
  const setSecureParkingAccount = useAddSecureParkingAccount()
  const dispatch = useDispatch()

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
      dispatch(parkingApi.util.resetApiState())
      dispatch(setIsLoggingIn(false))
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
      setAlert(alert)
    }
  }, [isError, error, setAlert])

  useEffect(() => {
    if (isLoading) {
      resetAlert()
    }
  }, [isLoading, resetAlert])

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        <Column gutter="md">
          <TextInputField
            autoFocus
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
          <Paragraph>
            Meld- of pincode kwijt? U vindt ze in{' '}
            <InlineLink
              isExternal
              logging-label="ParkingLoginFormInlineLink"
              onPress={() => openRedirect(RedirectKey.my_parking)}
              testID="ParkingLoginFormInlineLink">
              Mijn Parkeren
            </InlineLink>
          </Paragraph>
        </Column>

        <Button
          isLoading={form.formState.isSubmitting}
          label="Inloggen"
          onPress={onSubmit}
          testID="ParkingLoginFormSubmitButton"
        />
      </Column>
    </FormProvider>
  )
}
