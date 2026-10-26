import {useCallback, useMemo} from 'react'
import {useFormContext} from 'react-hook-form'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {ExternalInlineLink} from '@/components/ui/text/ExternalInlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts, type Alerts} from '@/modules/boat-charging/alerts'
import {BoatChargingVignetFormAddToMyVignettesSwitch} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetFormAddToMyVignettesSwitch'
import {BoatChargingVignetFormAddVignetButton} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetFormAddVignetButton'
import {BoatChargingVignetFormDeleteVignetButton} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetFormDeleteVignetButton'
import {BoatChargingVignetFormEditVignetButton} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetFormEditVignetButton'
import {BoatChargingVignetFormVerifyVignetButton} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetFormVerifyVignetButton'
import {BoatChargingVignetNumberFormInput} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetNumberFormInput'
import {BoatChargingVignetPostalCodeFormInput} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetPostalCodeFormInput'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingVignetFormProvider} from '@/modules/boat-charging/providers/BoatChargingVignetForm.provider'
import {useBoatChargingVignettesQuery} from '@/modules/boat-charging/service'
import type {NewSessionFormValues, Vignet} from '@/modules/boat-charging/types'
import {RedirectKey} from '@/modules/redirects/exports/RedirectKey'
import {devError} from '@/processes/development'
import {useAlert} from '@/store/slices/alert'

type Props = {
  onVerified?: (vignet: Omit<Vignet, 'id'>) => void
  vignetId?: Vignet['id']
}

export const BoatChargingVignetForm = ({vignetId, onVerified}: Props) => {
  const navigation = useNavigation()
  const {setAlert} = useAlert()
  const {isLoggedIn} = useIsLoggedIn()
  const {getValues} = useFormContext<NewSessionFormValues>()

  const {
    data: vignettes,
    isLoading: isLoadingVignettes,
    isError: isErrorVignettes,
  } = useBoatChargingVignettesQuery()

  const existingVignet = useMemo(
    () => vignettes?.find(vignet => vignet.id === vignetId),
    [vignettes, vignetId],
  )

  const onError = useCallback(
    (error?: unknown, alert?: Alerts) => {
      devError(error)
      setAlert(alerts[alert ?? 'vignetInvalidFailed'])
    },
    [setAlert],
  )

  const onSuccess = useCallback(() => navigation.goBack(), [navigation])

  if (isLoadingVignettes) {
    return <PleaseWait testID="BoatChargingVignetFormPleaseWait" />
  }

  if (isErrorVignettes) {
    return (
      <SomethingWentWrong testID="BoatChargingVignetFormSomethingWentWrong" />
    )
  }

  const defaultValues = existingVignet ?? getValues?.('vignet')

  return (
    <BoatChargingVignetFormProvider
      defaultValues={{
        postalCode: defaultValues?.postal_code,
        vignetNumber: defaultValues?.vignette_number,
      }}>
      <Column gutter="xl">
        <Column gutter="lg">
          {!existingVignet && (
            <Paragraph>
              Om te kunnen laden, heeft uw boot een geldig vignet nodig.
            </Paragraph>
          )}
          <Column gutter="md">
            <BoatChargingVignetNumberFormInput />

            {!existingVignet && (
              <Row gutter="sm">
                <Paragraph>Nog geen vignet?</Paragraph>

                <ExternalInlineLink
                  redirectKey={RedirectKey.boatChargingRequestVignet}
                  testID="BoatChargingVignetFormExternalLink">
                  Vignet aanvragen
                </ExternalInlineLink>
              </Row>
            )}
          </Column>

          <BoatChargingVignetPostalCodeFormInput />
        </Column>
        {!!isLoggedIn && !!onVerified && (
          <BoatChargingVignetFormAddToMyVignettesSwitch />
        )}

        {onVerified ? (
          <BoatChargingVignetFormVerifyVignetButton onVerified={onVerified} />
        ) : (
          <>
            {existingVignet ? (
              <>
                <BoatChargingVignetFormEditVignetButton
                  onError={onError}
                  onSuccess={onSuccess}
                  vignet={existingVignet}
                />
                <BoatChargingVignetFormDeleteVignetButton
                  onError={onError}
                  onSuccess={onSuccess}
                  vignetId={existingVignet.id}
                />
              </>
            ) : (
              <BoatChargingVignetFormAddVignetButton
                onError={onError}
                onSuccess={onSuccess}
                vignettes={vignettes}
              />
            )}
          </>
        )}
      </Column>
    </BoatChargingVignetFormProvider>
  )
}
