import {skipToken} from '@reduxjs/toolkit/query'
import {useRef} from 'react'
import type {LiveblogResponse} from '@/modules/news/types'
import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Size} from '@/components/ui/layout/Size'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useInterval} from '@/hooks/useInterval'
import {LiveblogNotificationToggleBox} from '@/modules/news/components/LiveblogNotificationToggleBox'
import {useNewsArticleQuery} from '@/modules/news/service'
import {devLog} from '@/processes/development'
import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'

const REFETCH_INTERVAL = 30 * 1000 // 30 seconds

export const Liveblog = ({id}: {id: LiveblogResponse['id']}) => {
  const refetchMockRef = useRef<number>(0) //TODO: remove

  const {
    data: liveblog,
    isLoading,
    isError,
    isFetching,
    fulfilledTimeStamp,
    refetch,
  } = useNewsArticleQuery(id ?? skipToken)

  useInterval(() => {
    void refetch()
    // eslint-disable-next-line sonarjs/pseudo-random
    refetchMockRef.current = refetchMockRef.current + Math.round(Math.random()) //TODO: remove
  }, REFETCH_INTERVAL)

  if (isLoading) {
    return <PleaseWait testID="LiveblogPleaseWait" />
  }

  if (isError || !liveblog) {
    return <SomethingWentWrong testID="LiveblogSomethingWentWrong" />
  }

  const {
    title,
    modification_datetime,
    body,
    is_active_liveblog,
    intro,
    images,
    liveblog_items,
    publication_datetime,
  } = liveblog as LiveblogResponse

  const mockItem: LiveblogResponse['liveblog_items'][number] = {
    body,
    creation_datetime: publication_datetime,
    id: 1,
    images,
    message_order: 1,
    title: 'title',
  }

  const items = liveblog_items?.length
    ? liveblog_items
    : (
        Array.from({length: 10}).fill(
          mockItem,
        ) as LiveblogResponse['liveblog_items'][number][]
      ).map((item, index) => ({
        ...item,
        id: item.id + index,
        creation_datetime: dayjs(item.creation_datetime)
          .add(10, 'minute')
          .toISOString(),
        message_order: item.message_order + index,
        title: `${item.title} ${index + 1}`,
      }))

  devLog(items?.length)

  return (
    <Column gutter="lg">
      <Column gutter="sm">
        <Title
          testID="LiveblogTitle"
          text={title}
        />
        <Phrase color="secondary">{`Laatste update ${dayjs(modification_datetime).format('DD MMMM, HH.mm')} uur`}</Phrase>
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

      {!is_active_liveblog ? (
        <>
          <LiveblogNotificationToggleBox articleId={id} />

          <LiveblogRefetchButton
            isFetching={isFetching}
            lastCheckedTimestamp={dayjs(fulfilledTimeStamp)}
            loadNewItems={() => (refetchMockRef.current = 0)}
            newItemCount={refetchMockRef.current}
          />
        </>
      ) : (
        <Phrase
          color="warning"
          emphasis="strong">
          Liveblog gesloten
        </Phrase>
      )}

      <HtmlContent
        content={body}
        testID="LiveblogContent"
      />
    </Column>
  )
}

const LiveblogRefetchButton = ({
  isFetching,
  loadNewItems,
  newItemCount,
  lastCheckedTimestamp,
}: {
  isFetching: boolean
  lastCheckedTimestamp: Dayjs
  loadNewItems: () => void
  newItemCount: number
}) => {
  if (isFetching) {
    return (
      <Size height={100}>
        <PleaseWait testID="LiveblogRefetchButtonPleaseWait" />
      </Size>
    )
  }

  return (
    <Size height={100}>
      {newItemCount ? (
        <Button
          alignSelf="center"
          label={
            newItemCount > 1
              ? `Toon ${newItemCount} nieuwe berichten`
              : 'Toon nieuw bericht'
          }
          onPress={() => loadNewItems()}
          testID="LiveblogRefetchButton"
        />
      ) : (
        <Phrase
          color="secondary"
          textAlign="center">
          Gecontroleerd op nieuwe berichten om{' '}
          {lastCheckedTimestamp.format('HH.mm')} uur
        </Phrase>
      )}
    </Size>
  )
}
