import {useController} from 'react-hook-form'
import {View} from 'react-native'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {useKeyboardHeight} from '@/hooks/useKeyboardHeight'
import {ParkingSessionDateTime} from '@/modules/parking/components/form/bottomsheet/ParkingSessionDateTime'
import {ParkingSessionTodayTomorrowStartTime} from '@/modules/parking/components/form/bottomsheet/ParkingSessionTodayTomorrowStartTime'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'

export const ParkingSessionStartTimeBottomSheetContent = () => {
  const currentPermit = useCurrentParkingPermit()
  const {
    field: {value: startTime, onChange},
  } = useController<{startTime: Dayjs}, 'startTime'>({
    name: 'startTime',
  })
  const {close} = useBottomSheet()
  const {height: keyboardHeight, visible: keyboardVisible} = useKeyboardHeight()

  const {max_session_length_in_days} = currentPermit

  return (
    <Box grow>
      <Title
        level="h5"
        text={
          max_session_length_in_days === 1
            ? 'Kies starttijd'
            : 'Kies starttijd en datum'
        }
        textAlign="center"
      />
      {max_session_length_in_days === 1 ? (
        <ParkingSessionTodayTomorrowStartTime />
      ) : (
        <ParkingSessionDateTime
          dateTime={startTime}
          maxDateTime={dayjs()
            .add(max_session_length_in_days, 'day')
            .endOf('day')}
          setDateTime={onChange}
        />
      )}
      <Button
        label="Gereed"
        onPress={close}
        testID="ParkingSessionStartTimeBottomSheetContentDoneButton"
      />
      {!!keyboardVisible && <View style={{height: keyboardHeight}} />}
    </Box>
  )
}
