import {Notice} from '@/components/ui/feedback/Notice'
import {useIsLocalTimeSameAsServerTime} from '@/hooks/useIsLocalTimeSameAsServerTime'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {isSameTime?: boolean; serverTime?: string}

export const TimeDifferenceNotice = (props: Props) => {
  const {isSameTime, serverTime} = useIsLocalTimeSameAsServerTime(
    props.serverTime ? undefined : true,
  )

  return isSameTime || props.isSameTime ? null : (
    <Notice
      text={`We gebruiken de tijd in Nederland. Daar is het nu ${dayjs(serverTime ?? props.serverTime).format('HH:mm')} uur.`}
      variant="warning"
    />
  )
}
