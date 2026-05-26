import {Notice} from '@/components/ui/feedback/Notice'
import {useIsLocalTimeSameAsServerTime} from '@/hooks/useIsLocalTimeSameAsServerTime'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {isSameTime?: boolean; serverTime?: string}

export const TimeDifferenceNotice = (props: Props) => {
  const {isSameTime, serverTime} = useIsLocalTimeSameAsServerTime(
    Boolean(props.serverTime),
  )

  return !(isSameTime && props.isSameTime) ? (
    <Notice
      text={`We gebruiken de tijd in Nederland. Daar is het nu ${dayjs(serverTime ?? props.serverTime).format('HH:mm')} uur.`}
      variant="warning"
    />
  ) : null
}
