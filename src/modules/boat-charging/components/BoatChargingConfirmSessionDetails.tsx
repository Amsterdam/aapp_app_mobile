import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo} from 'react'
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
import {VAT_FRACTION_FALLBACK} from '@/modules/boat-charging/constants/settings'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  useBoatChargingLocationDetailsQuery,
  useBoatChargingSettingsQuery,
  useBoatChargingVignettesQuery,
} from '@/modules/boat-charging/service'
import type {
  BaseVignet,
  NewSessionFormValues,
  Vignet,
} from '@/modules/boat-charging/types'
import {RedirectKey} from '@/modules/redirects/exports/RedirectKey'
import {formatNumber} from '@/utils/formatNumber'

const isVignet = (vignet?: BaseVignet | Vignet | null): vignet is Vignet =>
  !!vignet && 'id' in vignet

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
    isError: isErrorLocationDetails,
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

  const {
    vat_fraction,
    standard_fine,
    pre_authorization_amount,
    session_expiry_hours,
  } = settingsServerData || {}

  const vatFraction = vat_fraction ?? VAT_FRACTION_FALLBACK

  const infoRows = useMemo(
    () =>
      Object.entries({
        Stroomtarief: locationDetails?.tariff
          ? `${formatNumber(locationDetails?.tariff.energy_price_per_kwh * vatFraction, 'EUR', {maximumFractionDigits: 4})} per kWh`
          : undefined,
        Starttarief: locationDetails?.tariff
          ? formatNumber(
              locationDetails?.tariff.flat_fee_price * vatFraction,
              'EUR',
              {maximumFractionDigits: 4},
            )
          : undefined,
        [session_expiry_hours ? `Na ${session_expiry_hours} uur` : '']:
          standard_fine
            ? `${formatNumber(standard_fine, 'EUR')} per uur`
            : undefined,
      }).filter(([key, value]) => !!key && !!value),
    [locationDetails, vatFraction, standard_fine, session_expiry_hours],
  )

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
        {!!locationDetails?.address && (
          <Phrase color="secondary">
            {getAddressLine1(locationDetails?.address)}
          </Phrase>
        )}
      </MetaDataCard>

      <Column>
        <MetaDataCard
          testID="BoatChargingConfirmSessionVignetMetaDataCard"
          title="Vignet">
          <Phrase>{vignet?.vignette_number}</Phrase>
          {isVignet(vignet) && !!vignet.boat_name && (
            <Phrase color="secondary">{vignet?.boat_name}</Phrase>
          )}
        </MetaDataCard>
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
      </Column>

      {!!email && !isLoggedIn && (
        <Column>
          <MetaDataCard
            testID="BoatChargingConfirmSessionEmailAddressMetaDataCard"
            title="E-mailadres">
            <Phrase>{email}</Phrase>
          </MetaDataCard>
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
        </Column>
      )}

      <Column>
        <MetaDataCard
          testID="BoatChargingConfirmSessionCostsMetaDataCard"
          title="Kosten">
          {infoRows?.map(row => (
            <Phrase key={row[0]}>{row.join(' ')}</Phrase>
          ))}
        </MetaDataCard>
        {(!!isLoadingLocationDetails || !!isLoadingSettings) && (
          <PleaseWait testID="BoatChargingConfirmSessionDetailsPleaseWait" />
        )}
        {(!!isErrorLocationDetails || !!isErrorSettings) && (
          <SomethingWentWrong testID="BoatChargingConfirmSessionDetailsSomethingWentWrong" />
        )}
      </Column>

      {!!pre_authorization_amount && (
        <Paragraph color="secondary">
          We reserveren tijdelijk{' '}
          {formatNumber(pre_authorization_amount, 'EUR')} op uw rekening. Het
          restbedrag storten we terug na het laden.
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
