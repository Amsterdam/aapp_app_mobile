import {StyleSheet, View} from 'react-native'
import type {ComponentType} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {BoatChargingSessionInfoContainerCharging} from '@/modules/boat-charging/components/session/BoatChargingSessionInfoContainerCharging'
import {BoatChargingSessionInfoContainerCheckedOut} from '@/modules/boat-charging/components/session/BoatChargingSessionInfoContainerCheckedOut'
import {BoatChargingSessionInfoContainerStarting} from '@/modules/boat-charging/components/session/BoatChargingSessionInfoContainerStarting'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {NRGStatus} from '@/modules/boat-charging/types'

const MIN_CONTAINER_HEIGHT = 258

const mapStatusToComponent: Record<NRGStatus, ComponentType> = {
  [NRGStatus.Completed]: () => null,
  [NRGStatus.Cancelled]: () => null,
  [NRGStatus.CheckedOut]: BoatChargingSessionInfoContainerCheckedOut,
  [NRGStatus.Created]: BoatChargingSessionInfoContainerCheckedOut,
  [NRGStatus.Starting]: BoatChargingSessionInfoContainerStarting,
  [NRGStatus.Charging]: BoatChargingSessionInfoContainerCharging,
  [NRGStatus.Stopping]: BoatChargingSessionInfoContainerCharging,
}

export const BoatChargingSessionInfoContainer = () => {
  const {session} = useBoatChargingSession()
  const styles = createStyles()

  const Component = session
    ? mapStatusToComponent[session.nrg_status]
    : () => null

  return (
    <View style={styles.container}>
      <Box
        borderColor="default"
        borderStyle="solid"
        borderWidth="md"
        grow
        variant="distinct">
        <Column
          align="around"
          grow={1}
          gutter="md"
          halign="center">
          <Component />
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
