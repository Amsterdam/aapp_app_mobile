import {useEffect} from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {SwitchField} from '@/components/ui/forms/SwitchField'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ExternalInlineLink} from '@/components/ui/text/ExternalInlineLink'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useBoatChargingTermsQuery} from '@/modules/boat-charging/service'
import {
  selectLastApprovedTermsVersionWhileLoggedIn,
  setLastApprovedTermsVersionWhileLoggedIn,
} from '@/modules/boat-charging/slice'
import {RedirectKey} from '@/modules/redirects/types'

type Props =
  NavigationProps<BoatChargingRouteName.boatChargingTermsAndConditions>

type FormValues = {
  agreedToTerms: boolean
}

const AGREED_TO_TERMS_ERROR_MESSAGE =
  'Ga akkoord gaan met de voorwaarden om verder te gaan.'

export const BoatChargingTermsAndConditionsScreen = ({navigation}: Props) => {
  const form = useForm<FormValues>({
    defaultValues: {
      agreedToTerms: false,
    },
  })
  const {handleSubmit, setError} = form

  const {data: terms, isLoading, isError, refetch} = useBoatChargingTermsQuery()
  const lastApprovedTermsVersion = useSelector(
    selectLastApprovedTermsVersionWhileLoggedIn,
  )
  const dispatch = useDispatch()
  const {isLoggedIn} = useIsLoggedIn()

  const alreadyAgreedToTerms =
    isLoggedIn && terms?.version === lastApprovedTermsVersion

  useEffect(() => {
    if (alreadyAgreedToTerms) {
      form.setValue('agreedToTerms', true)
    }
  }, [alreadyAgreedToTerms, form])
  const agreedToTerms = form.watch('agreedToTerms')

  const onSubmit = () => {
    if (!terms) {
      setError('agreedToTerms', {
        type: 'manual',
        message: AGREED_TO_TERMS_ERROR_MESSAGE,
      })

      return
    }

    if (isLoggedIn) {
      dispatch(setLastApprovedTermsVersionWhileLoggedIn(terms.version))
    }

    navigation.popToTop()
  }

  return (
    <FormProvider {...form}>
      <Screen
        stickyFooter={
          <Box>
            <Button
              icon={{name: 'boat-charging-free', color: 'inverse'}}
              isLoading={isLoading}
              label="Betalen en laden"
              onPress={isError ? refetch : handleSubmit(onSubmit)}
              testID="BoatChargingTermsAndConditionsScreenSubmitButton"
            />
          </Box>
        }
        testID="BoatChargingTermsAndConditionsScreen">
        <Box grow>
          <Title
            level="h4"
            text="In het kort"
          />
          <Gutter height="sm" />
          {isLoading ? (
            <PleaseWait testID="BoatChargingTermsAndConditionsPleaseWait" />
          ) : isError ? (
            <Box insetVertical="md">
              <SomethingWentWrong testID="BoatChargingTermsAndConditionsSomethingWentWrong" />
            </Box>
          ) : (
            !!terms && (
              <HtmlContent
                content={terms.content}
                testID="BoatChargingTermsAndConditionsHtmlContent"
              />
            )
          )}
          <ExternalInlineLink
            redirectKey={RedirectKey.boatChargingTermsAndConditions}
            testID="BoatChargingTermsAndConditionsExternalLink">
            Bekijk alle voorwaarden
          </ExternalInlineLink>

          <Gutter height="xl" />
          <SwitchField
            accessibilityLabel={`Ik ga akkoord met de voorwaarden staat ${agreedToTerms ? 'aan' : 'uit'}`}
            disabled={isLoading || isError}
            label={<Phrase>Ik ga akkoord met de voorwaarden</Phrase>}
            name="agreedToTerms"
            rules={{
              required: AGREED_TO_TERMS_ERROR_MESSAGE,
            }}
            testID="BoatChargingTermsAndConditionsSwitch"
          />
        </Box>
      </Screen>
    </FormProvider>
  )
}
