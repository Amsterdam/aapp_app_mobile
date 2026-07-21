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
import {useThemable} from '@/themes/useThemable'

export const BoatChargingSessionBar = () => {
  const {navigate} = useNavigation()
  const styles = useThemable(createStyles)
  const {activeSessions} = useBoatChargingSessions()

  if (!activeSessions?.length) {
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
              name="boat-charging-charging"
              size="lg"
            />
            <Phrase
              color="inverse"
              emphasis="strong">
              Laden
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

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.boatCharging.sessionBar.background,
    },
  })
