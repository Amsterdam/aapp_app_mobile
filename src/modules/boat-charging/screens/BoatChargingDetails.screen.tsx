import {skipToken} from '@reduxjs/toolkit/query'
import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import type {BoatChargingLocation} from '@/modules/boat-charging/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {getAddressLine1} from '@/modules/address/utils/addDerivedAddressFields'
import {useBoatChargingLocationDetailsQuery} from '@/modules/boat-charging/service'
import {formatMaxKW} from '@/modules/boat-charging/utils/formatMaxKW'
import {formatNumber} from '@/utils/formatNumber'

type Props = NavigationProps<BoatChargingRouteName.boatChargingDetails>

export const BoatChargingDetailsScreen = ({route}: Props) => (
  <Screen
    scroll
    testID="BoatChargingDetailsScreen">
    <Box grow>
      <BoatChargingDetails id={route.params.id} />
    </Box>
  </Screen>
)

export const BoatChargingDetails = ({id}: {id: BoatChargingLocation['id']}) => {
  const {
    data: location,
    isLoading,
    isError,
  } = useBoatChargingLocationDetailsQuery(id ?? skipToken)

  if (isLoading) {
    return <PleaseWait testID="BoatChargingDetailsPleaseWait" />
  }

  if (isError || !location) {
    return <SomethingWentWrong testID="BoatChargingDetailsSomethingWentWrong" />
  }

  const {address, max_kw, tariff} = location

  return (
    <Column gutter="xl">
      <Column gutter="md">
        <Title
          level="h2"
          testID="BoatChargingDetailsScreenTitle"
          text={getAddressLine1(address)}
        />

        <Column>
          {Object.entries({
            Vermogen: formatMaxKW(max_kw) || 'Onbekend',
            Kosten: `${formatNumber(tariff.energy_price_per_kwh, 'EUR')} per kWh`,
            Starttarief: formatNumber(tariff.flat_fee_price, 'EUR'),
          }).map(([key, value]) => (
            <Row
              flex={1}
              key={key}>
              <Column flex={1}>
                <Phrase color="secondary">{key}</Phrase>
              </Column>
              <Column flex={1}>
                <Phrase color="secondary">{value}</Phrase>
              </Column>
            </Row>
          ))}
        </Column>
      </Column>

      <Column>
        <Title
          level="h4"
          testID="BoatChargingDetailsChooseSocketTitle"
          text="Kies stopcontact en betaal"
        />
      </Column>
    </Column>
  )
}
