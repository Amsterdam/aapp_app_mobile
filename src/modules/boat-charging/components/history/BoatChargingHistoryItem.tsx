import {memo} from 'react'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {getAddressLine1} from '@/modules/address/exports/utils/addDerivedAddressFields'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import type {BoatChargingHistoryInfiniteItem} from '@/modules/boat-charging/types'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  session: BoatChargingHistoryInfiniteItem
}

export const BoatChargingHistoryItem = memo(({session}: Props) => {
  const {navigate} = useNavigation()

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
    formatNumber(session.total_cost_incl_vat, session.currency),
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
      title={getAddressLine1(session.location.address)}
    />
  )
})
