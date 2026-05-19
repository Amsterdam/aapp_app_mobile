import {Notice} from '@/components/ui/feedback/Notice'
import {useIsLocalTimeSameAsServerTime} from '@/hooks/useIsLocalTimeSameAsServerTime'
import {dayjs} from '@/utils/datetime/dayjs'

export const TimeDifferenceNotice = () => {
  const {isSameTime, serverTime} = useIsLocalTimeSameAsServerTime()

  return isSameTime ? null : (
    <Notice
      text={`We gebruiken de tijd in Nederland. Daar is het nu ${dayjs(serverTime).format('HH:mm')} uur.`}
      variant="warning"
    />
  )
}
