import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import type {BoatChargingLocation} from '@/modules/boat-charging/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {getAddressLine1} from '@/modules/address/utils/addDerivedAddressFields'
import {BoatChargingDetailsInfoRows} from '@/modules/boat-charging/components/BoatChargingDetailsInfoRows'
import {BoatChargingDetailsSocketRadioGroup} from '@/modules/boat-charging/components/BoatChargingDetailsSocketRadioGroup'
import {BoatChargingHelpNavigationButton} from '@/modules/boat-charging/components/navigation/BoatChargingHelpNavigationButton'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {useNewSessionFormContext} from '@/modules/boat-charging/hooks/useNewSessionForm'
import {useBoatChargingLocationDetailsQuery} from '@/modules/boat-charging/service'
import {formatMaxKW} from '@/modules/boat-charging/utils/formatMaxKW'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

const REFETCH_INTERVAL = 1000 * 15

export const BoatChargingDetails = ({id}: {id: BoatChargingLocation['id']}) => {
  const {
    data: location,
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
    fulfilledTimeStamp,
  } = useBoatChargingLocationDetailsQuery(id ?? skipToken, {
    pollingInterval: REFETCH_INTERVAL,
  })

  const {
    activeSessions,
    isLoading: isLoadingSessions,
    isError: isErrorSessions,
  } = useBoatChargingSessions()

  const infoRows = useMemo(
    () =>
      Object.entries({
        Vermogen: formatMaxKW(location?.max_kw),
        Kosten: location?.tariff
          ? `${formatNumber(location?.tariff.energy_price_per_kwh, 'EUR')} per kWh`
          : undefined,
        Starttarief: location?.tariff
          ? formatNumber(location?.tariff.flat_fee_price, 'EUR')
          : undefined,
      }),
    [location],
  )

  const form = useNewSessionFormContext()

  if (isLoadingLocation || isLoadingSessions) {
    return (
      <PleaseWait
        showFeedback
        testID="BoatChargingDetailsPleaseWait"
      />
    )
  }

  if (isErrorLocation || isErrorSessions || !location) {
    return <SomethingWentWrong testID="BoatChargingDetailsSomethingWentWrong" />
  }

  return (
    <Column
      grow={1}
      gutter="xl">
      <Column gutter="md">
        <Title
          level="h2"
          testID="BoatChargingDetailsScreenTitle"
          text={getAddressLine1(location.address)}
        />

        <BoatChargingDetailsInfoRows rows={infoRows} />
      </Column>

      <Column gutter="md">
        <Column gutter="smd">
          <Title
            level="h4"
            testID="BoatChargingDetailsChooseSocketTitle"
            text="Kies stopcontact en betaal"
          />

          <Paragraph>
            Betaal eerst en doe daarna de stekker in het stopcontact.
          </Paragraph>

          <BoatChargingDetailsSocketRadioGroup
            chargingStations={location.charging_stations}
            hasActiveSession={!!activeSessions?.length}
          />
          {!!form.formState.errors.root?.message && (
            <ErrorMessage
              testID={`BoatChargingDetailsChooseSocketErrorMessage`}
              text={form.formState.errors.root.message}
            />
          )}

          {!!fulfilledTimeStamp && (
            <Phrase color="secondary">
              Laatste update om{' '}
              {formatTimeToDisplay(fulfilledTimeStamp, {
                includeHoursLabel: true,
              })}
            </Phrase>
          )}
        </Column>
        <BoatChargingHelpNavigationButton />
      </Column>
    </Column>
  )
}
