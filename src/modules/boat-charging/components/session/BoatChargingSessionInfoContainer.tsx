import {StyleSheet, View} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {BoatChargingHelpNavigationButton} from '@/modules/boat-charging/components/navigation/BoatChargingHelpNavigationButton'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {NRGStatus} from '@/modules/boat-charging/types'

const MIN_CONTAINER_HEIGHT = 258

export const BoatChargingSessionInfoContainer = () => {
  const {activeSession, isPluggedIn} = useBoatChargingSessions()
  const styles = createStyles()

  return (
    <View style={styles.container}>
      <Box
        borderColor="default"
        borderStyle="solid"
        borderWidth="md"
        grow
        variant="distinct">
        <Column
          align="center"
          grow={1}
          gutter="md">
          {activeSession?.nrg_status === NRGStatus.Charging ? (
            <Title
              level="h5"
              text="De boot wordt momenteel opgeladen."
            />
          ) : (
            <Column
              gutter="md"
              halign="center">
              <Icon
                name="boat-charging-plug"
                size="xl"
              />
              <Title
                level="h4"
                text={
                  isPluggedIn
                    ? 'De stekker is aangesloten. De sessie kan worden gestart.'
                    : 'Steek de stekker in het stopcontact'
                }
                textAlign="center"
              />
              <BoatChargingHelpNavigationButton />
            </Column>
          )}
        </Column>
      </Box>
    </View>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      minHeight: MIN_CONTAINER_HEIGHT,
    },
  })
