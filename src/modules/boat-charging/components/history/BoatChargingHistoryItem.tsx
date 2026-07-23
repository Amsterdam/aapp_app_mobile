import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
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

  return (
    <NavigationButton
      chevronColor="secondary"
      chevronSize="md"
      description={description}
      icon={{color: 'link', name: 'lightning', size: 'lg'}}
      // TODO: implement navigation to session details when merged
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onPress={() => {}}
      testID="BoatChargingHistoryNavigationButton"
      title={session.location.name}
    />
  )
}
