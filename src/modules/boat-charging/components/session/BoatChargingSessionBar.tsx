// eslint-disable-next-line no-restricted-imports
import {Pressable, StyleSheet} from 'react-native'
import type {Theme} from '@/themes/themes'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingSessionProvider} from '@/modules/boat-charging/providers/BoatChargingSession.provider'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {selectBoatChargingLastGuestSessionId} from '@/modules/boat-charging/slice'
import {NRGStatus} from '@/modules/boat-charging/types'
import {useThemable} from '@/themes/useThemable'

const getStatusText = (
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

const BoatChargingSessionBarContent = () => {
  const {navigate} = useNavigation()
  const styles = useThemable(createStyles)
  const {session, isPluggedIn, chargingTimeVeryShortString} =
    useBoatChargingSession()

  if (!session) {
    return null
  }

  const statusText = getStatusText(
    session,
    isPluggedIn,
    chargingTimeVeryShortString,
  )

  return (
    <Pressable
      onPress={() =>
        navigate(BoatChargingRouteName.activeSessionDetails, {
          id: session.id,
        })
      }
      style={styles.container}>
      <Box
        insetHorizontal="md"
        insetVertical="sm">
        <Row
          align="between"
          gutter="md">
          <Row gutter="sm">
            <Icon
              color="inverse"
              isFilled
              name="lightning"
              size="lg"
            />
            <Phrase
              color="inverse"
              emphasis="strong">
              {statusText}
            </Phrase>
          </Row>
          <Icon
            color="inverse"
            name="chevron-right"
          />
        </Row>
      </Box>
    </Pressable>
  )
}

export const BoatChargingSessionBar = () => {
  const {isLoggedIn} = useIsLoggedIn()
  const lastGuestSessionId = useSelector(selectBoatChargingLastGuestSessionId)
  const {activeSessions} = useBoatChargingSessions()
  const id = isLoggedIn ? activeSessions?.[0]?.id : lastGuestSessionId

  if (!id) {
    return null
  }

  return (
    <BoatChargingSessionProvider id={id}>
      <BoatChargingSessionBarContent />
    </BoatChargingSessionProvider>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.boatCharging.sessionBar.background,
    },
  })
