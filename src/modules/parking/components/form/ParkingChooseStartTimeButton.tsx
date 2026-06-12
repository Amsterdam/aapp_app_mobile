import {useCallback, useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {Column} from '@/components/ui/layout/Column'
import {useInterval} from '@/hooks/useInterval'
import {useIsLocalTimeSameAsServerTime} from '@/hooks/useIsLocalTimeSameAsServerTime'
import {TimeDifferenceNotice} from '@/modules/parking/components/TimeDifferenceNotice'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingSession} from '@/modules/parking/hooks/useParkingSession'
import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {isToday} from '@/utils/datetime/isToday'

export const ParkingChooseStartTimeButton = () => {
  const {setValue, watch} = useFormContext<{
    endTime?: Dayjs
    originalEndTime?: Dayjs
    startTime: Dayjs
  }>()
  const {endTime, originalEndTime, startTime: startTimeField} = watch()
  const {startTimeRef, userHasEditedStart} = useParkingSession()
  const {started_at} = useCurrentParkingPermit()

  const {isSameTime, isLoading, serverTime} = useIsLocalTimeSameAsServerTime()

  const checkStartTime = useCallback(() => {
    if (isLoading) {
      return
    }

    if (!isSameTime) {
      if (
        serverTime &&
        (!userHasEditedStart.current ||
          startTimeField.isBefore(dayjs(serverTime)))
      ) {
        setValue('startTime', dayjs(serverTime))

        if (!startTimeRef.current) {
          startTimeRef.current = dayjs(serverTime)
        }
      }

      return
    }

    const now = dayjs().set('second', 0)

    if (!startTimeRef.current) {
      startTimeRef.current = now
    }

    if (!originalEndTime && now.isAfter(startTimeField)) {
      setValue('startTime', now)
      startTimeRef.current = now
    }
  }, [
    isSameTime,
    isLoading,
    originalEndTime,
    serverTime,
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
            const permitStartDate = dayjs(started_at)

            if (startTime.isBefore(permitStartDate)) {
              const today = isToday(permitStartDate)

              const dateString = today
                ? permitStartDate.format('HH:mm')
                : `${permitStartDate.format('DD MMMM')} om ${permitStartDate.format('HH:mm')}`

              return `Uw vergunning is pas vanaf ${dateString} uur actief`
            }

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
        text={startTime =>
          formatDateTimeToDisplay(startTime, false, serverTime)
        }
        title="Starttijd"
      />
    </Column>
  )
}
