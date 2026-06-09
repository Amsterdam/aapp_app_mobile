import {skipToken} from '@reduxjs/toolkit/query'
import {useRef} from 'react'
import type {LiveblogResponse} from '@/modules/news/types'
import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useInterval} from '@/hooks/useInterval'
import {LiveblogItemSeparator} from '@/modules/news/components/liveblog/LiveblogItemSeparator'
import {LiveblogNotificationToggleBox} from '@/modules/news/components/liveblog/LiveblogNotificationToggleBox'
import {LiveblogUpdateStatus} from '@/modules/news/components/liveblog/LiveblogUpdateStatus'
import {useNewsLiveblogQuery} from '@/modules/news/service'
import {devLog} from '@/processes/development'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

const REFETCH_INTERVAL = 30 * 1000 // 30 seconds

export const LiveblogHeader = ({id}: {id: LiveblogResponse['id']}) => {
  const refetchMockRef = useRef<number>(0) //TODO: remove

  const {
    data: liveblog,
    isFetching,
    fulfilledTimeStamp,
    refetch,
  } = useNewsLiveblogQuery(id ?? skipToken, {
    selectFromResult: ({data, currentData, ...rest}) => {
      devLog(data)

      return {
        ...rest,
        data: {...currentData, liveblog_items: []} as LiveblogResponse,
      }
    },
  })

  useInterval(() => {
    void refetch()
    // eslint-disable-next-line sonarjs/pseudo-random
    refetchMockRef.current = refetchMockRef.current + Math.round(Math.random()) //TODO: remove
  }, REFETCH_INTERVAL)

  if (!liveblog) {
    return null
  }

  const {title, intro, is_active_liveblog, modification_datetime} = liveblog

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
      />

      <LiveblogItemSeparator />
    </>
  )
}
