import {useController, useFormContext} from 'react-hook-form'
import {View} from 'react-native'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {useKeyboardHeight} from '@/hooks/useKeyboardHeight'
import {ParkingSessionDateTime} from '@/modules/parking/components/form/bottomsheet/ParkingSessionDateTime'
import {ParkingSessionDurationTimePicker} from '@/modules/parking/components/form/bottomsheet/ParkingSessionDurationTimePicker'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'

type FieldValues = {endTime?: Dayjs; originalEndTime?: Dayjs; startTime: Dayjs}

export const ParkingSessionEndTimeBottomSheetContent = () => {
  const {watch} = useFormContext<FieldValues>()
  const startTime = watch('startTime')
  const {
    field: {value: endTime, onChange},
  } = useController<FieldValues, 'endTime'>({
    name: 'endTime',
  })
  const {close} = useBottomSheet()

  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()

  const {height: keyboardHeight, visible: keyboardVisible} = useKeyboardHeight()

  const {max_session_length_in_days} = currentPermit

  const minimumEndTime =
    parkingAccount?.scope === ParkingPermitScope.visitor
      ? dayjs.max(dayjs(), dayjs(watch('originalEndTime')))
      : dayjs()

  return (
    <Box grow>
      {max_session_length_in_days === 1 ? (
        <ParkingSessionDurationTimePicker
          currentPermit={currentPermit}
          minimumEndTime={minimumEndTime}
        />
      ) : (
        <>
          <Title
            level="h5"
            text="Kies eindtijd en datum"
            textAlign="center"
          />
          <ParkingSessionDateTime
            dateTime={endTime ?? startTime}
            maxDateTime={startTime
              .add(max_session_length_in_days, 'day')
              .endOf('day')}
            setDateTime={onChange}
          />
        </>
      )}

      <Button
        label="Gereed"
        onPress={close}
        testID="ParkingSessionEndTimeBottomSheetContentDoneButton"
      />
      {!!keyboardVisible && <View style={{height: keyboardHeight}} />}
    </Box>
  )
}
