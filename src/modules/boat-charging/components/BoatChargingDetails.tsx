import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useInterval} from '@/hooks/useInterval'
import {getAddressLine1} from '@/modules/address/utils/addDerivedAddressFields'
import {BoatChargingDetailsInfoRows} from '@/modules/boat-charging/components/BoatChargingDetailsInfoRows'
import {BoatChargingDetailsSocketRadioGroup} from '@/modules/boat-charging/components/BoatChargingDetailsSocketRadioGroup'
import {BoatChargingDetailsSocketSubmitButton} from '@/modules/boat-charging/components/BoatChargingDetailsSocketSubmitButton'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useBoatChargingLocationDetailsQuery} from '@/modules/boat-charging/service'
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
    isLoading,
    isError,
    refetch,
    fulfilledTimeStamp,
  } = useBoatChargingLocationDetailsQuery(id ?? skipToken)

  const {navigate} = useNavigation()

  useInterval(() => {
    void refetch()
  }, REFETCH_INTERVAL)

  const form = useForm<{socket: string}>()

  const infoRows = useMemo(
    () => ({
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

  if (isLoading) {
    return <PleaseWait testID="BoatChargingDetailsPleaseWait" />
  }

  if (isError || !location) {
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
          <NavigationButton
            chevronSize="md"
            emphasis="default"
            horizontallyAlign="start"
            insetHorizontal="no"
            onPress={() => navigate(BoatChargingRouteName.boatCharging)} // TODO: change route
            testID="BoatChargingDetailsHelpNavigationButton"
            title="Hulp bij laden"
          />
        </Column>

        {location.charging_stations.some(
          socket => socket.status === ChargingPointStatus.OPERATIVE,
        ) && <BoatChargingDetailsSocketSubmitButton />}
      </FormProvider>
    </Column>
  )
}
