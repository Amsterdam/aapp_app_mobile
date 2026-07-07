import {useCallback} from 'react'
import type {NewsArticleBase} from '@/modules/news/types'
import {ContentButton} from '@/components/ui/buttons/ContentButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {LiveblogTag} from '@/modules/news/components/liveblog/LiveblogTag'
import {NewsRouteName} from '@/modules/news/routes'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

type Props = NewsArticleBase & {dummy?: boolean; includeDate?: boolean}

export const NewsListItem = ({
  id,
  images,
  publication_datetime,
  title,
  includeDate = true,
  is_active_liveblog = false,
  is_liveblog = false,
  dummy = false,
}: Props) => {
  const {navigate} = useNavigation()

  const navigateTo = useCallback(() => {
    if (dummy) {
      return
    }

    if (is_liveblog) {
      return navigate(NewsRouteName.liveblog, {
        id,
      })
    }

    return navigate(NewsRouteName.article, {id})
  }, [dummy, is_liveblog, navigate, id])

  return (
    <ContentButton
      dummy={dummy}
      images={images}
      meta={
        includeDate && !is_active_liveblog
          ? formatDateToDisplay(publication_datetime, false, false)
          : undefined
      }
      onPress={navigateTo}
      tag={!!is_active_liveblog && <LiveblogTag variant="transparent" />}
      testID={`NewsListItem${id}Button`}
      title={title}
    />
  )
}
