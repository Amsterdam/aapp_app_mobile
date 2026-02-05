import {useCallback} from 'react'
import {StyleSheet, View} from 'react-native'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {ParkingLicensePlate} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  setLicensePlate: (licensePlate: ParkingLicensePlate) => void
}

export const ParkingSessionSelectLicensePlate = ({setLicensePlate}: Props) => {
  const {close} = useBottomSheet()
  const styles = createStyles()

  const {licensePlates, isLoading} = useGetLicensePlates()

  const activeLicensePlates = licensePlates?.filter(l => !l.is_future)

  const onPress = useCallback(
    (licensePlate: ParkingLicensePlate) => {
      setLicensePlate(licensePlate)
      close()
    },
    [setLicensePlate, close],
  )

  if (isLoading) {
    return <PleaseWait testID="ParkingSessionSelectLicensePlatePleaseWait" />
  }

  if (!activeLicensePlates) {
    return (
      <SomethingWentWrong testID="ParkingSessionSelectLicensePlateSomethingWentWrong" />
    )
  }

  return (
    <View style={styles.container}>
      <Column gutter="sm">
        <Title
          level="h5"
          text="Mijn kentekens"
        />
        {activeLicensePlates.length === 0 && (
          <Phrase>U heeft nog geen kentekens opgeslagen.</Phrase>
        )}
        {activeLicensePlates?.map(licensePlate => {
          const title = `${licensePlate.vehicle_id}${licensePlate.visitor_name ? ' - ' + licensePlate.visitor_name : ''}`

          return (
            <TopTaskButton
              accessibilityLabel={`Kenteken ${title}`}
              icon={{name: 'car'}}
              key={licensePlate.vehicle_id}
              onPress={() => onPress(licensePlate)}
              testID="ParkingSessionSelectLicensePlateTopTaskButton"
              title={title}
            />
          )
        })}
      </Column>
    </View>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  })
