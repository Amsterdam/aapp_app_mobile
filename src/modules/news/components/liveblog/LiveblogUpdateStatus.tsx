import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {LiveblogUpdateButton} from '@/modules/news/components/liveblog/LiveblogUpdateButton'

type Props = {
  isActive: boolean
  isFetching: boolean
  lastUpdated?: number
  pendingItemCount: number
  showPendingItems: () => void
}

export const LiveblogUpdateStatus = ({isActive, ...rest}: Props) => {
  if (isActive) {
    return <LiveblogUpdateButton {...rest} />
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
