import {useController, useFormContext} from 'react-hook-form'
import {View} from 'react-native'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'
import {useKeyboardHeight} from '@/hooks/useKeyboardHeight'
import {ParkingSessionDateTime} from '@/modules/parking/components/form/bottomsheet/ParkingSessionDateTime'
import {ParkingSessionDurationTimePicker} from '@/modules/parking/components/form/bottomsheet/ParkingSessionDurationTimePicker'
import type {ParkingSessionFormValues} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

export const ParkingSessionEndTimeBottomSheetContent = () => {
  const {watch} = useFormContext<ParkingSessionFormValues>()
  const {
    field: {value: endTime, onChange},
  } = useController<ParkingSessionFormValues, 'endTime'>({
    name: 'endTime',
  })
  const {close} = useBottomSheet()
  const {originalEndTime, startTime} = watch()

  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()

  const {height: keyboardHeight, visible: keyboardVisible} = useKeyboardHeight()

  const {max_session_length_in_days} = currentPermit

  const minimumEndTime =
    parkingAccount?.scope === ParkingPermitScope.visitor
      ? dayjs.max(dayjs(), dayjs(originalEndTime))
      : startTime

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
            minDateTime={minimumEndTime}
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
