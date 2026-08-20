import {useCallback, useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {Column} from '@/components/ui/layout/Column'
import {useInterval} from '@/hooks/useInterval'
import {useTimeDifference} from '@/hooks/useTimeDifference'
import {TimeDifferenceNotice} from '@/modules/parking/components/TimeDifferenceNotice'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingSession} from '@/modules/parking/hooks/useParkingSession'
import {getPermitStartDateString} from '@/modules/parking/utils/getPermitStartDateString'
import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingChooseStartTimeButton = () => {
  const {setValue, watch} = useFormContext<{
    endTime?: Dayjs
    originalEndTime?: Dayjs
    startTime: Dayjs
  }>()
  const {endTime, originalEndTime, startTime: startTimeField} = watch()
  const {startTimeRef, userHasEditedStart} = useParkingSession()
  const {started_at} = useCurrentParkingPermit()

  const {isSameTime, serverNow} = useTimeDifference()

  const checkStartTime = useCallback(() => {
    if (!serverNow) {
      return
    }

    if (!isSameTime) {
      if (!userHasEditedStart.current || startTimeField.isBefore(serverNow)) {
        setValue('startTime', serverNow)

        if (!startTimeRef.current) {
          startTimeRef.current = serverNow
        }
      }

      return
    }

    const now = dayjs().set('second', 0)

    startTimeRef.current ??= now

    if (!originalEndTime && now.isAfter(startTimeField)) {
      setValue('startTime', now)
      startTimeRef.current = now
    }
  }, [
    isSameTime,
    originalEndTime,
    serverNow,
    setValue,
    startTimeField,
    startTimeRef,
    userHasEditedStart,
  ])

  useEffect(() => {
    checkStartTime()
  }, [endTime, checkStartTime])

  useInterval(checkStartTime, 5000)

  return (
    <Column gutter="md">
      <TimeDifferenceNotice />
      <SelectButtonControlled<{startTime: Dayjs}, 'startTime'>
        bottomSheetVariant={ParkingSessionBottomSheetVariant.startTime}
        icon={{name: 'clock', size: 'lgx'}}
        name="startTime"
        rules={{
          required: 'Kies een starttijd',
          validate: startTime => {
            if (started_at && startTime.isBefore(dayjs(started_at))) {
              return getPermitStartDateString(started_at)
            }

            const currentTime = !isSameTime
              ? serverNow
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
        text={startTime => formatDateTimeToDisplay(startTime, false, serverNow)}
        title="Starttijd"
      />
    </Column>
  )
}
