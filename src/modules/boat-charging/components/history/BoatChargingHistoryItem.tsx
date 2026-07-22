import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'

type Props = {
  session: BoatChargingSession
}

export const BoatChargingHistoryItem = ({session}: Props) => {
  const description = `${typeof session.total_cost === 'number' ? '€ ' + session.total_cost + ' - ' : ''}${session.kwh} kWh`

  return (
    <NavigationButton
      chevronColor="secondary"
      chevronSize="md"
      description={description}
      icon={{color: 'link', name: 'boat-charging-charging', size: 'lg'}}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onPress={() => {}}
      testID="BoatChargingHistoryNavigationButton"
      title={session.location.name}
    />
  )
}
