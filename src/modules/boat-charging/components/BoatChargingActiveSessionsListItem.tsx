import {useMemo} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {getAddressLine1} from '@/modules/address/exports/utils/addDerivedAddressFields'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {getSessionStatusText} from '@/modules/boat-charging/utils/getSessionStatusText'

type Props = {session: BoatChargingSession}

export const BoatChargingActiveSessionsListItem = ({
  session: sessionFromList,
}: Props) => {
  const {navigate} = useNavigation()
  const {session, isPluggedIn, chargingTimeVeryShortString} =
    useBoatChargingSession()

  const {address, statusText} = useMemo(
    () => ({
      address: getAddressLine1(session?.location.address),
      statusText: getSessionStatusText(
        session,
        isPluggedIn,
        chargingTimeVeryShortString,
      ),
    }),
    [session, isPluggedIn, chargingTimeVeryShortString],
  )

  const resolvedSession = session ?? sessionFromList

  if (!resolvedSession) {
    return null
  }

  const {id, vignette_number, boat_name} = resolvedSession

  return (
    <TopTaskButton
      accessibilityLabel={`Laadsessie op locatie ${address}. Status: ${statusText}`}
      icon={{name: 'lightning', size: 'lg'}}
      iconRight={{
        name: 'chevron-right',
        size: 'lg',
        color: 'secondary',
      }}
      insetHorizontal="no"
      onPress={() => navigate(BoatChargingRouteName.activeSessionDetails, {id})}
      testID="BoatChargingActiveSessionsListItemTopTaskButton"
      text={[vignette_number, boat_name].filter(Boolean).join(' - ')}
      textAdditional={statusText}
      title={address}
    />
  )
}
