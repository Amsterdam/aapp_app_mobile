import {useCallback, useEffect, useState} from 'react'
import {useParkingSession} from '@/modules/parking/hooks/useParkingSession'
import {type Dayjs} from '@/utils/datetime/dayjs'

export const useChangeSessionStartDate = (
  onChange: (date: Dayjs) => void,
  startTime: Dayjs,
) => {
  const {startTimeRef, userHasEditedStart} = useParkingSession()
  const [newStartTime, setNewStartTime] = useState<Dayjs | null>(
    startTime ?? startTimeRef.current,
  )

  useEffect(() => {
    if (startTime) {
      setNewStartTime(startTime)
    }
  }, [startTime])

  useEffect(() => {
    if (!newStartTime) {
      return
    }

    onChange(newStartTime)
  }, [newStartTime, onChange])

  const changeNewStartTime = useCallback(
    (date: Dayjs) => {
      userHasEditedStart.current = true
      setNewStartTime(date)
    },
    [userHasEditedStart],
  )

  return {
    minDate: startTimeRef.current,
    newStartTime,
    changeNewStartTime,
  }
}
