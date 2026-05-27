import {useCallback, useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {Column} from '@/components/ui/layout/Column'
import {useInterval} from '@/hooks/useInterval'
import {useIsLocalTimeSameAsServerTime} from '@/hooks/useIsLocalTimeSameAsServerTime'
import {TimeDifferenceNotice} from '@/modules/parking/components/TimeDifferenceNotice'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useParkingSession} from '@/modules/parking/hooks/useParkingSession'
import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingChooseStartTimeButton = () => {
  const {setValue, watch} = useFormContext<{
    endTime?: Dayjs
    originalEndTime?: Dayjs
    startTime: Dayjs
  }>()
  const {endTime, originalEndTime, startTime: startTimeField} = watch()
  const {userHasEditedStart} = useParkingSession()

  const {isSameTime, serverTime} = useIsLocalTimeSameAsServerTime()

  const checkStartTime = useCallback(() => {
    if (!isSameTime) {
      if (serverTime && !userHasEditedStart.current) {
        setValue('startTime', dayjs(serverTime))
      }

      return
    }

    const now = dayjs().set('second', 0)

    if (!originalEndTime && now.isAfter(startTimeField)) {
      setValue('startTime', now)
    }
  }, [
    isSameTime,
    originalEndTime,
    serverTime,
    setValue,
    startTimeField,
    userHasEditedStart,
  ])

  useEffect(() => {
    checkStartTime()
  }, [endTime, checkStartTime])

  useInterval(checkStartTime, 5000)

  return (
    <Column gutter="md">
      <TimeDifferenceNotice
        isSameTime={isSameTime}
        serverTime={serverTime}
      />
      <SelectButtonControlled<{startTime: Dayjs}, 'startTime'>
        bottomSheetVariant={ParkingSessionBottomSheetVariant.startTime}
        icon={{name: 'clock', size: 'lgx'}}
        name="startTime"
        rules={{
          required: 'Kies een starttijd',
          validate: startTime => {
            const currentTime = !isSameTime
              ? dayjs(serverTime)
              : dayjs().set('second', 0)

            if (startTime.isBefore(currentTime, 'minute')) {
              return 'Starttijd mag niet in het verleden liggen'
            }

            if (!endTime) {
              return true
            }
          },
        }}
        testID="ParkingChooseStartTimeButton"
        text={startTime => formatDateTimeToDisplay(startTime, false)}
        title="Starttijd"
      />
    </Column>
  )
}
