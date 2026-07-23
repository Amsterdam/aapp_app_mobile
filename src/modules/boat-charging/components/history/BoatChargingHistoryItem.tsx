import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {formatNumber} from '@/utils/formatNumber'

type Props = {
  session: BoatChargingSession
}

export const BoatChargingHistoryItem = ({session}: Props) => {
  const elements = [
    typeof session.total_cost === 'number'
      ? formatNumber(session.total_cost * 1.21, session.currency)
      : null,
    typeof session.kwh === 'number' ? `${session.kwh} kWh` : null,
  ].filter(Boolean)
  const description = elements.join(' - ')

  return (
    <NavigationButton
      chevronColor="secondary"
      chevronSize="md"
      description={description}
      // TODO: use lightning icon when merged
      icon={{color: 'link', name: 'boat-charging-charging', size: 'lg'}}
      // TODO: implement navigation to session details when merged
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onPress={() => {}}
      testID="BoatChargingHistoryNavigationButton"
      title={session.location.name}
    />
  )
}
