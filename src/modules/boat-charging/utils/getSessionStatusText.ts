import type {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {NRGStatus} from '@/modules/boat-charging/types'

export const getSessionStatusText = (
  session: ReturnType<typeof useBoatChargingSession>['session'],
  isPluggedIn: boolean,
  chargingTimeVeryShortString: string | undefined,
) => {
  if (!session) {
    return ''
  }

  switch (session.nrg_status) {
    case NRGStatus.Charging:
      if (chargingTimeVeryShortString) {
        return `Laden - ${chargingTimeVeryShortString}`
      } else {
        return 'Laden'
      }

    case NRGStatus.Starting:
      return 'Het laden wordt gestart'
    case NRGStatus.Stopping:
      return 'Het laden wordt gestopt'
    case NRGStatus.Completed:
    case NRGStatus.Cancelled:
      return 'Het laden is gestopt'
    default:
      return isPluggedIn ? 'Start laden' : 'Stekker aansluiten'
  }
}
