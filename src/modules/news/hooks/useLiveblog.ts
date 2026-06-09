import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useEffect, useMemo, useState} from 'react'
import type {LiveblogResponse, NewsArticleBase} from '@/modules/news/types'
import {useInterval} from '@/hooks/useInterval'
import {useNewsLiveblogQuery} from '@/modules/news/service'
import {dayjs} from '@/utils/datetime/dayjs'

const REFETCH_INTERVAL = 10 * 1000 // 30 seconds

export const useLiveblog = (id: NewsArticleBase['id']) => {
  const [visibleItemCount, setVisibleItemCount] = useState<number>(0)

  const {data, refetch, ...rest} = useNewsLiveblogQuery(id ?? skipToken)

  useInterval(() => {
    if (data?.is_active_liveblog) {
      void refetch()
    }
  }, REFETCH_INTERVAL)

  useEffect(() => {
    if (!data?.liveblog_items || visibleItemCount > 0) {
      return
    }

    // Initial items are always visible
    setVisibleItemCount(data.liveblog_items.length)
  }, [data, visibleItemCount])

  const sortedItems: LiveblogResponse['liveblog_items'] = useMemo(() => {
    if (!data) {
      return []
    }

    return data?.liveblog_items
      ?.slice(0, visibleItemCount)
      .sort((a, b) =>
        dayjs(a.creation_datetime).isBefore(b.creation_datetime) ? 1 : -1,
      )
  }, [data, visibleItemCount])

  const showPendingItems = useCallback(() => {
    if (!data) {
      return
    }

    setVisibleItemCount(data?.liveblog_items.length)
  }, [data])

  return {
    data: data ? {...data, liveblog_items: sortedItems} : undefined,
    refetch,
    ...rest,
    showPendingItems,
    pendingItemCount: (data?.liveblog_items.length || 0) - visibleItemCount,
  }
}
