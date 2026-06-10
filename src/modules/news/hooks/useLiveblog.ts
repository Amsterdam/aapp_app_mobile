import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useEffect, useState} from 'react'
import type {LiveblogResponse, NewsArticleBase} from '@/modules/news/types'
import {useInterval} from '@/hooks/useInterval'
import {useNewsLiveblogQuery} from '@/modules/news/service'
import {sortByDateDescending} from '@/modules/news/utils/sortByDateDescending'

const REFETCH_INTERVAL = 10 * 1000

export const useLiveblog = (id?: NewsArticleBase['id']) => {
  const [visibleItems, setVisibleItems] = useState<
    LiveblogResponse['liveblog_items']
  >([])

  const {data, refetch, ...rest} = useNewsLiveblogQuery(id ?? skipToken)

  useInterval(() => {
    if (data?.is_active_liveblog) {
      void refetch()
    }
  }, REFETCH_INTERVAL)

  useEffect(() => {
    if (!data?.liveblog_items || visibleItems.length > 0) {
      return
    }

    const sortedItems = sortByDateDescending(
      data.liveblog_items,
      'creation_datetime',
    )

    setVisibleItems(sortedItems)
  }, [data, visibleItems])

  const showPendingItems = useCallback(() => {
    if (!data) {
      return
    }

    const sortedItems = sortByDateDescending(
      data.liveblog_items,
      'creation_datetime',
    )

    setVisibleItems(sortedItems)
  }, [data])

  return {
    data: data ? {...data, liveblog_items: visibleItems} : undefined,
    refetch,
    ...rest,
    showPendingItems,
    pendingItemCount: Math.max(
      0,
      (data?.liveblog_items.length || 0) - visibleItems.length,
    ),
  }
}
