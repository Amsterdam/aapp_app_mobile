// eslint-disable-next-line no-restricted-imports
import {Pressable, StyleSheet} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {BoatChargingSessionProvider} from '@/modules/boat-charging/providers/BoatChargingSession.provider'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {getSessionStatusText} from '@/modules/boat-charging/utils/getSessionStatusText'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const BoatChargingSessionBarContentSingleSession = () => {
  const {navigate} = useNavigation()
  const {session, isPluggedIn, chargingTimeVeryShortString} =
    useBoatChargingSession()

  if (!session) {
    return null
  }

  return (
    <BoatChargingSessionBarContent
      onPress={() =>
        navigate(BoatChargingRouteName.activeSessionDetails, {id: session.id})
      }
      text={getSessionStatusText(
        session,
        isPluggedIn,
        chargingTimeVeryShortString,
      )}
    />
  )
}

type BoatChargingSessionBarContentProps = {
  onPress: () => void
  text: string
}

const BoatChargingSessionBarContent = ({
  onPress,
  text,
}: BoatChargingSessionBarContentProps) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable
      accessibilityLabel={text}
      accessibilityRole="button"
      onPress={onPress}
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
              {text}
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
  const {activeSessions} = useBoatChargingSessions()
  const {navigate} = useNavigation()

  if (!activeSessions?.length) {
    return null
  }

  if (activeSessions.length === 1) {
    return (
      <BoatChargingSessionProvider id={activeSessions[0].id}>
        <BoatChargingSessionBarContentSingleSession />
      </BoatChargingSessionProvider>
    )
  }

  return (
    <BoatChargingSessionBarContent
      onPress={() => navigate(BoatChargingRouteName.activeSessions)}
      text={`${activeSessions.length} actieve laadsessies`}
    />
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.boatCharging.sessionBar.background,
    },
  })
