import type {LiveblogResponse} from '@/modules/news/types'
import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {LiveblogItemSeparator} from '@/modules/news/components/liveblog/LiveblogItemSeparator'
import {LiveblogNotificationToggleBox} from '@/modules/news/components/liveblog/LiveblogNotificationToggleBox'
import {LiveblogUpdateStatus} from '@/modules/news/components/liveblog/LiveblogUpdateStatus'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

type Props = {
  data?: LiveblogResponse
  fulfilledTimeStamp?: number
  isFetching: boolean
  pendingItemCount: number
  showPendingItems: () => void
}

export const LiveblogHeader = ({
  data,
  isFetching,
  fulfilledTimeStamp,
  pendingItemCount,
  showPendingItems,
}: Props) => {
  if (!data) {
    return null
  }

  const {title, intro, is_active_liveblog, modification_datetime, id} = data

  return (
    <>
      <Column gutter="lg">
        <Column gutter="sm">
          <Title
            testID="LiveblogTitle"
            text={title}
          />

          <Phrase color="secondary">{`Laatste update ${formatDateTimeToDisplay(modification_datetime, false).toLowerCase()}`}</Phrase>
        </Column>

        {!!intro && (
          <Column gutter="sm">
            <Title
              level="h4"
              text="Samenvatting"
            />
            <HtmlContent
              content={intro}
              testID="LiveblogIntroHtmlContent"
            />
          </Column>
        )}
      </Column>

      {!!is_active_liveblog && <LiveblogNotificationToggleBox articleId={id} />}

      <LiveblogUpdateStatus
        isActive={!!is_active_liveblog}
        isFetching={isFetching}
        lastUpdated={fulfilledTimeStamp}
        pendingItemCount={pendingItemCount}
        showPendingItems={showPendingItems}
      />

      <LiveblogItemSeparator />
    </>
  )
}
