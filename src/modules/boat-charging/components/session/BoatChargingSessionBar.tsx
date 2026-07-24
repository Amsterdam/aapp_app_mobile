// eslint-disable-next-line no-restricted-imports
import {Pressable, StyleSheet} from 'react-native'
import type {Theme} from '@/themes/themes'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {BoatChargingSessionProvider} from '@/modules/boat-charging/providers/BoatChargingSession.provider'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {NRGStatus} from '@/modules/boat-charging/types'
import {useThemable} from '@/themes/useThemable'

const BoatChargingSessionBarContent = () => {
  const {navigate} = useNavigation()
  const styles = useThemable(createStyles)
  const {session, isPluggedIn, chargingTimeVeryShortString} =
    useBoatChargingSession()

  if (!session) {
    return null
  }

  return (
    <Pressable
      onPress={() =>
        navigate(BoatChargingRouteName.boatChargingActiveSessionDetails, {
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
              {session.nrg_status === NRGStatus.Charging
                ? 'Laden'
                : isPluggedIn
                  ? 'Start laden'
                  : 'Stekker aansluiten'}
            </Phrase>
            {session?.nrg_status === NRGStatus.Charging && (
              <Phrase
                color="inverse"
                emphasis="strong">
                {`- ${chargingTimeVeryShortString}`}
              </Phrase>
            )}
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
  const {activeSessions} = useBoatChargingSessions()
  const id = activeSessions?.[0]?.id ?? ''

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
