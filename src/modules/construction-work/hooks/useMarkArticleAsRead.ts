import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {
  addReadArticle,
  deleteReadArticle,
  ReadArticle,
  selectConstructionWorkReadArticles,
} from '@/modules/construction-work/slice'
import {ArticlesItem} from '@/modules/construction-work/types/api'
import {getUniqueArticleId} from '@/modules/construction-work/utils/getUniqueArticleId'
import {getDateDiffInDays} from '@/utils/datetime/getDateDiffInDays'

export const useMarkArticleAsRead = () => {
  const readArticles = useSelector(selectConstructionWorkReadArticles)
  const dispatch = useDispatch()

  const deleteOldArticles = useCallback(() => {
    readArticles.forEach(readArticle => {
      if (
        getDateDiffInDays(readArticle.publicationDate) > recentArticleMaxAge
      ) {
        dispatch(deleteReadArticle(readArticle.id))
      }
    })
  }, [dispatch, readArticles])

  const markAsRead = useCallback(
    (article: ReadArticle, cleanup = true) => {
      if (cleanup) {
        deleteOldArticles()
      }

      if (getDateDiffInDays(article.publicationDate) > recentArticleMaxAge) {
        return
      }

      if (readArticles.find(readArticle => readArticle.id === article.id)) {
        return
      }

      dispatch(addReadArticle(article))
    },
    [deleteOldArticles, dispatch, readArticles],
  )

  const markMultipleAsRead = useCallback(
    (articles: ArticlesItem[]) => {
      deleteOldArticles()
      articles?.forEach(({meta_id, publication_date}) =>
        markAsRead(
          {
            id: getUniqueArticleId(meta_id),
            publicationDate: publication_date,
          },
          false,
        ),
      )
    },
    [deleteOldArticles, markAsRead],
  )

  const markMultipleAsUnRead = useCallback(
    (articles: ArticlesItem[]) => {
      articles?.forEach(({meta_id}) =>
        dispatch(deleteReadArticle(getUniqueArticleId(meta_id))),
      )
    },
    [dispatch],
  )

  return {markAsRead, markMultipleAsRead, markMultipleAsUnRead}
}
