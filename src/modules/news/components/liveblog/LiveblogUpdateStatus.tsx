import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {LiveblogUpdateButton} from '@/modules/news/components/liveblog/LiveblogUpdateButton'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  isActive: boolean
  isFetching: boolean
  lastUpdated?: number
}

export const LiveblogUpdateStatus = ({
  isActive,
  isFetching,
  lastUpdated,
}: Props) => {
  if (isActive) {
    return (
      <LiveblogUpdateButton
        isFetching={isFetching}
        lastCheckedTimestamp={dayjs(lastUpdated)}
        loadNewItems={() => null}
        newItemCount={2}
      />
    )
  }

  return (
    <>
      <Phrase
        color="warning"
        emphasis="strong">
        Liveblog gesloten
      </Phrase>
      <Gutter height="lg" />
    </>
  )
}
