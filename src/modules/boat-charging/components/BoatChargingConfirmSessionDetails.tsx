import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {MetaDataCard} from '@/components/ui/MetaDataCard'
import {ExternalInlineLink} from '@/components/ui/text/ExternalInlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {getAddressLine1} from '@/modules/address/exports/utils/addDerivedAddressFields'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  useBoatChargingLocationDetailsQuery,
  useBoatChargingSettingsQuery,
  useBoatChargingVignettesQuery,
} from '@/modules/boat-charging/service'
import type {NewSessionFormValues} from '@/modules/boat-charging/types'
import {RedirectKey} from '@/modules/redirects/exports/RedirectKey'
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingConfirmSessionDetails = () => {
  const form = useFormContext<NewSessionFormValues>()
  const navigation = useNavigation()
  const {isLoggedIn} = useIsLoggedIn()

  const {selectedSocket, vignet, email} = form.getValues()

  const {data: vignettes} = useBoatChargingVignettesQuery(undefined, {
    skip: !isLoggedIn,
  })

  const {
    data: settingsServerData,
    isLoading: isLoadingSettings,
    isError: isErrorSettings,
  } = useBoatChargingSettingsQuery()

  const {
    data: locationDetails,
    isLoading: isLoadingLocationDetails,
    isError: isLoadingLocationError,
  } = useBoatChargingLocationDetailsQuery(
    selectedSocket?.locationId ? selectedSocket.locationId : skipToken,
  )

  const onNavigateToChangeVignet = useCallback(() => {
    const selectedVignet = form.getValues('vignet')

    form.setValue('vignet', null)

    if (!vignettes?.length) {
      navigation.popTo(BoatChargingRouteName.verifyVignet)

      return
    }

    if (
      vignettes.length === 1 &&
      vignettes[0].vignette_number === selectedVignet?.vignette_number
    ) {
      navigation.popTo(BoatChargingRouteName.verifyVignet)
    } else {
      navigation.popTo(BoatChargingRouteName.chooseVignet)
    }
  }, [vignettes, navigation, form])

  if (isLoadingLocationDetails || isLoadingSettings) {
    return <PleaseWait testID="BoatChargingConfirmSessionDetailsPleaseWait" />
  }

  if (isLoadingLocationError || isErrorSettings) {
    return (
      <SomethingWentWrong testID="BoatChargingConfirmSessionDetailsSomethingWentWrong" />
    )
  }

  return (
    <Column gutter="lg">
      <MetaDataCard
        testID="BoatChargingConfirmSessionSocketMetaDataCard"
        title="Stopcontact">
        <Phrase>
          {[selectedSocket?.stationId, selectedSocket?.socketNumber]
            .filter(Boolean)
            .join('-')}
        </Phrase>
        <Phrase color="secondary">
          {getAddressLine1(locationDetails?.address)}
        </Phrase>
      </MetaDataCard>

      <MetaDataCard
        testID="BoatChargingConfirmSessionVignetMetaDataCard"
        title="Vignet">
        <Phrase>{vignet?.vignette_number}</Phrase>
        {!!vignet?.boat_name && (
          <Phrase color="secondary">{vignet?.boat_name}</Phrase>
        )}
        {/* TODO: change this component to the new InlineLink component. https://gemeente-amsterdam.atlassian.net/browse/AM-1132 */}
        <NavigationButton
          chevronSize="md"
          emphasis="default"
          horizontallyAlign="start"
          insetHorizontal="no"
          insetVertical="no"
          onPress={onNavigateToChangeVignet}
          testID="BoatChargingConfirmSessionVignetNavigationButton"
          title="Wijzigen"
        />
      </MetaDataCard>

      {!!email && !isLoggedIn && (
        <MetaDataCard
          testID="BoatChargingConfirmSessionEmailAddressMetaDataCard"
          title="E-mailadres">
          <Phrase>{email}</Phrase>
          {/* TODO: change this component to the new InlineLink component. https://gemeente-amsterdam.atlassian.net/browse/AM-1132 */}
          <NavigationButton
            chevronSize="md"
            emphasis="default"
            horizontallyAlign="start"
            insetHorizontal="no"
            insetVertical="no"
            onPress={() => navigation.popTo(BoatChargingRouteName.guestEmail)}
            testID="BoatChargingConfirmSessionEmailAddressNavigationButton"
            title="Wijzigen"
          />
        </MetaDataCard>
      )}

      {!!locationDetails && (
        <MetaDataCard
          testID="BoatChargingConfirmSessionCostsMetaDataCard"
          title="Kosten">
          <Phrase>
            Stroomtarief{' '}
            {formatNumber(locationDetails.tariff.energy_price_per_kwh, 'EUR')}{' '}
            per kWh
          </Phrase>
          <Phrase>
            Starttarief{' '}
            {formatNumber(locationDetails.tariff.flat_fee_price, 'EUR')}
          </Phrase>
          {!!settingsServerData?.standard_fine && (
            <Phrase>
              Na 24 uur {formatNumber(settingsServerData.standard_fine, 'EUR')}{' '}
              per uur
            </Phrase>
          )}
        </MetaDataCard>
      )}

      {!!settingsServerData?.pre_authorization_amount && (
        <Paragraph color="secondary">
          We reserveren tijdelijk{' '}
          {formatNumber(settingsServerData?.pre_authorization_amount, 'EUR')} op
          uw rekening. Het restbedrag storten we terug na het laden.
        </Paragraph>
      )}

      <ExternalInlineLink
        redirectKey={RedirectKey.boatChargingTermsAndConditions}
        testID="BoatChargingConfirmSessionDetailsTermsAndConditionsExternalLink">
        Bekijk alle voorwaarden
      </ExternalInlineLink>
    </Column>
  )
}
