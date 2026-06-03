import {useCallback, useEffect, useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useNewsArticlesQuery} from '@/modules/news/service'
import {
  selectHighlightedArticleId,
  selectHighlightedArticleStatus,
  setHighlightedArticleId,
} from '@/modules/news/slice'
import {
  DashboardHighlightStatus,
  type NewsArticleBase,
} from '@/modules/news/types'

export const useHighlightedArticle = () => {
  const highlightedArticleId = useSelector(selectHighlightedArticleId)
  const highlightedArticleStatus = useSelector(selectHighlightedArticleStatus)
  const dispatch = useDispatch()

  const {data: highlights, ...rest} = useNewsArticlesQuery({type: 'highlight'})

  const liveblog = useMemo(
    // TODO: add liveblog check once possible
    () =>
      highlights?.result.find(
        highlight =>
          !!(highlight as NewsArticleBase & {isLiveblog: boolean}).isLiveblog,
      ),
    [highlights],
  )

  const advanceHighlight = useCallback(() => {
    if (!highlights?.result.length || liveblog) {
      return
    }

    const indexOfHighlightedArticle = highlights.result.findIndex(
      highlight => highlight.id === highlightedArticleId,
    )

    const nextIndex =
      indexOfHighlightedArticle + 1 > highlights.result.length - 1
        ? 0
        : indexOfHighlightedArticle + 1

    dispatch(setHighlightedArticleId(highlights.result[nextIndex].id))
  }, [highlights, dispatch, highlightedArticleId, liveblog])

  useEffect(() => {
    if (highlightedArticleStatus === DashboardHighlightStatus.stale) {
      advanceHighlight()
    }
  }, [highlightedArticleStatus, advanceHighlight])

  return {
    highlightedArticle: useMemo(
      () =>
        liveblog || highlights?.result.find(h => h.id === highlightedArticleId),
      [highlights, highlightedArticleId, liveblog],
    ),
    ...rest,
  }
}
