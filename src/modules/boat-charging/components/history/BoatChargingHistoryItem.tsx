import {memo} from 'react'
import type {BoatChargingHistoryInfiniteItem} from '@/modules/boat-charging/components/history/BoatChargingHistory'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {VAT_FRACTION_FALLBACK} from '@/modules/boat-charging/constants/settings'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useBoatChargingSettingsQuery} from '@/modules/boat-charging/service'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  session: BoatChargingHistoryInfiniteItem
}

export const BoatChargingHistoryItem = memo(({session}: Props) => {
  const {navigate} = useNavigation()

  const {data: settingsServerData} = useBoatChargingSettingsQuery()

  if ('dummy' in session && session.dummy === true) {
    return (
      <Box insetTop="md">
        <Skeleton isLoading>
          <NavigationButton
            chevronColor="secondary"
            chevronSize="md"
            icon={{color: 'link', name: 'lightning', size: 'lg'}}
            onPress={() => null}
            testID="BoatChargingHistoryDummyNavigationButton"
            title="Laden"
          />
        </Skeleton>
      </Box>
    )
  }

  const elements = [
    typeof session.total_cost === 'number'
      ? formatNumber(
          session.total_cost *
            (settingsServerData?.vat_fraction ?? VAT_FRACTION_FALLBACK),
          session.currency,
        )
      : null,
    typeof session.kwh === 'number' ? formatKWH(session.kwh) : null,
  ].filter(Boolean)
  const description = elements.join(' - ')

  return (
    <NavigationButton
      chevronColor="secondary"
      chevronSize="md"
      description={description}
      icon={{color: 'link', name: 'lightning', size: 'lg'}}
      onPress={() =>
        navigate(BoatChargingRouteName.historySessionDetails, {
          id: session.id,
        })
      }
      testID="BoatChargingHistoryNavigationButton"
      title={session.location.name}
    />
  )
})
