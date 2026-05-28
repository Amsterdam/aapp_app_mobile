import {useEffect, useState} from 'react'
import {useParkingSession} from '@/modules/parking/hooks/useParkingSession'
import {type Dayjs} from '@/utils/datetime/dayjs'

export const useChangeSessionStartDate = (
  onChange: (date: Dayjs) => void,
  startTime: Dayjs,
) => {
  const {startTimeRef, userHasEditedStart} = useParkingSession()
  const [newStartTime, setNewStartTime] = useState<Dayjs>(
    startTime ?? startTimeRef.current,
  )

  useEffect(() => {
    if (!newStartTime) return
    userHasEditedStart.current = true
    onChange(newStartTime)
  }, [newStartTime, onChange, userHasEditedStart])

  return {
    minDate: startTimeRef.current,
    newStartTime,
    setNewStartTime,
  }
}
