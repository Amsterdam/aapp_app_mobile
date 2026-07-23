import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  session: BoatChargingSession
}

export const BoatChargingHistoryItem = ({session}: Props) => {
  const elements = [
    typeof session.total_cost === 'number'
      ? formatNumber(session.total_cost * 1.21, session.currency)
      : null,
    typeof session.kwh === 'number' ? formatKWH(session.kwh) : null,
  ].filter(Boolean)
  const description = elements.join(' - ')
  const {navigate} = useNavigation()

  return (
    <NavigationButton
      chevronColor="secondary"
      chevronSize="md"
      description={description}
      icon={{color: 'link', name: 'lightning', size: 'lg'}}
      onPress={() =>
        navigate('BoatChargingHistorySessionDetails', {id: session.id})
      }
      testID="BoatChargingHistoryNavigationButton"
      title={session.location.name}
    />
  )
}
