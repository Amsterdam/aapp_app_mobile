import {memo} from 'react'
import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatNumber} from '@/utils/formatNumber'

export type BoatChargingSessionOrDummy =
  | (BoatChargingSession & {dummy?: never})
  | {dummy: true; start_date_time: string}

type Props = {
  session: BoatChargingSessionOrDummy
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
    typeof session.total_cost === 'number'
      ? formatNumber(session.total_cost * 1.21, session.currency)
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
