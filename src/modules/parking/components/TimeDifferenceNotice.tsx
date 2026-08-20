import {Notice} from '@/components/ui/feedback/Notice'
import {useTimeDifference} from '@/hooks/useTimeDifference'

export const TimeDifferenceNotice = () => {
  const {isSameTime, isSameDay, serverNow} = useTimeDifference()

  const showNotice = !isSameTime && serverNow

  return showNotice ? (
    <Notice
      text={`We gebruiken de tijd in Nederland. Daar is het nu ${serverNow.format(isSameDay ? 'HH:mm' : 'D MMMM, HH:mm')} uur.`}
      variant="warning"
    />
  ) : null
}
