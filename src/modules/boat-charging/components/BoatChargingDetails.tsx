import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useInterval} from '@/hooks/useInterval'
import {getAddressLine1} from '@/modules/address/utils/addDerivedAddressFields'
import {BoatChargingDetailsInfoRows} from '@/modules/boat-charging/components/BoatChargingDetailsInfoRows'
import {BoatChargingDetailsSocketRadioGroup} from '@/modules/boat-charging/components/BoatChargingDetailsSocketRadioGroup'
import {BoatChargingDetailsSocketSubmitButton} from '@/modules/boat-charging/components/BoatChargingDetailsSocketSubmitButton'
import {BoatChargingHelpNavigationButton} from '@/modules/boat-charging/components/navigation/BoatChargingHelpNavigationButton'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {useBoatChargingLocationDetailsQuery} from '@/modules/boat-charging/service'
import {useGuestSessionFormValues} from '@/modules/boat-charging/slice'
import {
  ChargingPointStatus,
  type BoatChargingLocation,
} from '@/modules/boat-charging/types'
import {formatMaxKW} from '@/modules/boat-charging/utils/formatMaxKW'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

const REFETCH_INTERVAL = 1000 * 15

export const BoatChargingDetails = ({id}: {id: BoatChargingLocation['id']}) => {
  const {
    data: location,
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
    refetch: refetchLocationDetails,
    fulfilledTimeStamp,
  } = useBoatChargingLocationDetailsQuery(id ?? skipToken)

  const {
    activeSessions,
    isLoading: isLoadingSessions,
    isError: isErrorSessions,
  } = useBoatChargingSessions()

  const {socketId} = useGuestSessionFormValues()

  useInterval(refetchLocationDetails, REFETCH_INTERVAL)

  const form = useForm<{socketId: string}>({defaultValues: {socketId}})

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

  const showSubmitButton = useMemo(
    () =>
      !activeSessions?.length &&
      location?.charging_stations.some(
        socket => socket.status === ChargingPointStatus.OPERATIVE,
      ),
    [activeSessions, location],
  )

  if (isLoadingLocation || isLoadingSessions) {
    return <PleaseWait testID="BoatChargingDetailsPleaseWait" />
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

      <FormProvider {...form}>
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

        {!!showSubmitButton && <BoatChargingDetailsSocketSubmitButton />}
      </FormProvider>
    </Column>
  )
}
