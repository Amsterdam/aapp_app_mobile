import {useCallback, useEffect, useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useNewsArticlesQuery} from '@/modules/news/service'
import {
  selectHighlightedArticleQueue,
  selectHighlightedArticleStatus,
  setHighlightedArticleQueue,
} from '@/modules/news/slice'
import {
  DashboardHighlightStatus,
  type NewsArticleBase,
} from '@/modules/news/types'
import {mergeAndOrderQueue} from '@/modules/news/utils/mergeAndOrderQueue'

export const useHighlightedArticle = () => {
  const highlightedArticleQueue = useSelector(selectHighlightedArticleQueue)
  const highlightedArticleStatus = useSelector(selectHighlightedArticleStatus)
  const dispatch = useDispatch()

  const {data: highlights, ...rest} = useNewsArticlesQuery({type: 'highlight'})

  const advanceHighlightQueue = useCallback(() => {
    const incomingQueue = highlights?.result.map(h => h.id) ?? []

    const newQueue = mergeAndOrderQueue(
      new Set(highlightedArticleQueue),
      new Set(incomingQueue),
    )

    dispatch(setHighlightedArticleQueue([...newQueue]))
  }, [highlights, dispatch, highlightedArticleQueue])

  useEffect(() => {
    if (rest.isError || rest.isLoading) {
      return
    }

    if (highlightedArticleStatus === DashboardHighlightStatus.stale) {
      advanceHighlightQueue()
    }
  }, [
    highlightedArticleStatus,
    advanceHighlightQueue,
    rest.isError,
    rest.isLoading,
  ])

  const highlightedArticle = useMemo(() => {
    const liveblog = highlights?.result.find(
      highlight =>
        !!(highlight as NewsArticleBase & {isLiveblog: boolean}).isLiveblog,
    )

    if (liveblog) {
      return liveblog
    }

    return highlights?.result.find(
      highlight => highlight.id === highlightedArticleQueue[0],
    )
  }, [highlightedArticleQueue, highlights?.result])

  return {
    highlightedArticle,
    ...rest,
  }
}
