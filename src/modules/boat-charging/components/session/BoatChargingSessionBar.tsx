// eslint-disable-next-line no-restricted-imports
import {Pressable, StyleSheet} from 'react-native'
import type {Theme} from '@/themes/themes'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {NRGStatus} from '@/modules/boat-charging/types'
import {useThemable} from '@/themes/useThemable'

export const BoatChargingSessionBar = () => {
  const {navigate} = useNavigation()
  const styles = useThemable(createStyles)
  const {activeSession, isPluggedIn, chargingTimeString} =
    useBoatChargingSessions()

  if (!activeSession) {
    return null
  }

  return (
    <Pressable
      onPress={() => navigate(BoatChargingRouteName.boatChargingSession)}
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
              {activeSession.nrg_status === NRGStatus.Charging
                ? 'Laden'
                : isPluggedIn
                  ? 'Start laden'
                  : 'Stekker aansluiten'}
            </Phrase>
            {activeSession?.nrg_status === NRGStatus.Charging && (
              <Phrase
                color="inverse"
                emphasis="strong">
                {`- ${chargingTimeString}`}
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

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.boatCharging.sessionBar.background,
    },
  })
