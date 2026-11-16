import {skipToken} from '@reduxjs/toolkit/query'
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
import {BoatChargingVignetteFormAddToMyVignettesSwitch} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetteFormAddToMyVignettesSwitch'
import {BoatChargingVignetteFormAddVignetteButton} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetteFormAddVignetteButton'
import {BoatChargingVignetteFormDeleteVignetteButton} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetteFormDeleteVignetteButton'
import {BoatChargingVignetteFormEditVignetteButton} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetteFormEditVignetteButton'
import {BoatChargingVignetteFormVerifyVignetteButton} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetteFormVerifyVignetteButton'
import {BoatChargingVignetteNumberFormInput} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignetteNumberFormInput'
import {BoatChargingVignettePostalCodeFormInput} from '@/modules/boat-charging/components/vignettes/form/BoatChargingVignettePostalCodeFormInput'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingVignetteFormProvider} from '@/modules/boat-charging/providers/BoatChargingVignetteForm.provider'
import {useBoatChargingVignettesQuery} from '@/modules/boat-charging/service'
import type {
  BaseVignette,
  NewSessionFormValues,
  Vignette,
} from '@/modules/boat-charging/types'
import {RedirectKey} from '@/modules/redirects/exports/RedirectKey'
import {devError} from '@/processes/development'
import {useAlert} from '@/store/slices/alert'

type Props = {
  onVerified?: (vignette: BaseVignette) => void
  vignetteId?: Vignette['id']
}

export const BoatChargingVignetteForm = ({vignetteId, onVerified}: Props) => {
  const navigation = useNavigation()
  const {setAlert} = useAlert()
  const {isLoggedIn} = useIsLoggedIn()
  const {getValues} = useFormContext<NewSessionFormValues>()

  const {
    data: vignettes,
    isLoading: isLoadingVignettes,
    isError: isErrorVignettes,
  } = useBoatChargingVignettesQuery(isLoggedIn ? undefined : skipToken)

  const existingVignette = useMemo(
    () => vignettes?.find(vignette => vignette.id === vignetteId),
    [vignettes, vignetteId],
  )

  const onError = useCallback(
    (error?: unknown, alert?: Alerts) => {
      devError(error)
      setAlert(alerts[alert ?? 'vignetteInvalidFailed'])
    },
    [setAlert],
  )

  const onSuccess = useCallback(() => navigation.goBack(), [navigation])

  if (isLoadingVignettes) {
    return <PleaseWait testID="BoatChargingVignetteFormPleaseWait" />
  }

  if (isErrorVignettes) {
    return (
      <SomethingWentWrong testID="BoatChargingVignetteFormSomethingWentWrong" />
    )
  }

  const defaultValues = existingVignette ?? getValues?.('vignette')

  return (
    <BoatChargingVignetteFormProvider
      defaultValues={{
        postalCode: defaultValues?.postal_code,
        vignetteNumber: defaultValues?.vignette_number,
      }}>
      <Column gutter="xl">
        <Column gutter="lg">
          {!existingVignette && (
            <Paragraph>
              Om te kunnen laden, heeft uw boot een geldig vignet nodig.
            </Paragraph>
          )}
          <Column gutter="md">
            <BoatChargingVignetteNumberFormInput />

            {!existingVignette && (
              <Row gutter="sm">
                <Paragraph>Nog geen vignet?</Paragraph>

                <ExternalInlineLink
                  redirectKey={RedirectKey.boatChargingRequestVignette}
                  testID="BoatChargingVignetteFormExternalLink">
                  Vignet aanvragen
                </ExternalInlineLink>
              </Row>
            )}
          </Column>

          <BoatChargingVignettePostalCodeFormInput />
        </Column>
        {!!isLoggedIn && !!onVerified && (
          <BoatChargingVignetteFormAddToMyVignettesSwitch />
        )}

        {onVerified ? (
          <BoatChargingVignetteFormVerifyVignetteButton
            onVerified={onVerified}
          />
        ) : (
          <>
            {existingVignette ? (
              <>
                <BoatChargingVignetteFormEditVignetteButton
                  onError={onError}
                  onSuccess={onSuccess}
                  vignette={existingVignette}
                />
                <BoatChargingVignetteFormDeleteVignetteButton
                  onError={onError}
                  onSuccess={onSuccess}
                  vignetteId={existingVignette.id}
                />
              </>
            ) : (
              <BoatChargingVignetteFormAddVignetteButton
                onError={onError}
                onSuccess={onSuccess}
                vignettes={vignettes}
              />
            )}
          </>
        )}
      </Column>
    </BoatChargingVignetteFormProvider>
  )
}
