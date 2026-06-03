import {useDispatch} from '@/hooks/redux/useDispatch'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {markHighlightArticleAsStale} from '@/modules/news/slice'

export const useAdvanceHighlightedArticle = () => {
  const dispatch = useDispatch()

  useFocusAndForegroundEffect(() => {
    dispatch(markHighlightArticleAsStale())
  }, [dispatch])
}
