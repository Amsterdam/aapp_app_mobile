import {useEffect, useState, type ReactNode} from 'react'
import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Switch} from '@/components/ui/forms/Switch'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
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
  useGuestSessionFormValues,
} from '@/modules/boat-charging/slice'
import {RedirectKey} from '@/modules/redirects/types'

type Props =
  NavigationProps<BoatChargingRouteName.boatChargingTermsAndConditions>

const SwitchWrapper = ({children}: {children: ReactNode}) => (
  <Box
    insetHorizontal="lg"
    insetVertical="sm">
    <Row valign="end">{children}</Row>
  </Box>
)

export const BoatChargingTermsAndConditionsScreen = ({navigation}: Props) => {
  const {resetForm} = useGuestSessionFormValues()
  const {data: terms, isLoading, isError, refetch} = useBoatChargingTermsQuery()
  const lastApprovedTermsVersion = useSelector(
    selectLastApprovedTermsVersionWhileLoggedIn,
  )
  const dispatch = useDispatch()
  const {isLoggedIn} = useIsLoggedIn()
  const [value, setValue] = useState(false)
  const [error, setError] = useState(false)

  const alreadyAgreedToTerms =
    isLoggedIn && terms?.version === lastApprovedTermsVersion

  useEffect(() => {
    if (alreadyAgreedToTerms) {
      setValue(true)
    }
  }, [alreadyAgreedToTerms])

  const onChange = () => {
    setError(false)
    setValue(oldValue => !oldValue)
  }

  const onSubmit = () => {
    if (!value || !terms) {
      setError(true)

      return
    }

    if (isLoggedIn) {
      dispatch(setLastApprovedTermsVersionWhileLoggedIn(terms.version))
    }

    resetForm()
    navigation.popToTop()
  }

  return (
    <Screen
      stickyFooter={
        <Box>
          <Button
            icon={{name: 'boat-charging-free', color: 'inverse'}}
            isLoading={isLoading}
            label="Betalen en laden"
            onPress={isError ? refetch : onSubmit}
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
          <SomethingWentWrong testID="BoatChargingTermsAndConditionsSomethingWentWrong" />
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
        <Switch
          accessibilityLabel={`Ik ga akkoord met de voorwaarden staat ${value ? 'aan' : 'uit'}`}
          disabled={isLoading || isError}
          label={<Phrase>Ik ga akkoord met de voorwaarden</Phrase>}
          onChange={onChange}
          testID="BoatChargingTermsAndConditionsSwitch"
          value={value}
          wrapper={SwitchWrapper}
        />
        {!!error && (
          <>
            <Gutter height="sm" />
            <ErrorMessage
              testID="BoatChargingTermsAndConditionsErrorMessage"
              text="U moet akkoord gaan met de voorwaarden om verder te gaan."
            />
          </>
        )}
      </Box>
    </Screen>
  )
}
