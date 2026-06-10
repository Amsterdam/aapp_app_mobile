import {Fragment, useCallback} from 'react'
import type {NewsArticleBase} from '@/modules/news/types'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Phrase} from '@/components/ui/text/Phrase'
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
        isActive: is_active_liveblog,
      })
    }

    return navigate(NewsRouteName.article, {id})
  }, [dummy, is_liveblog, navigate, id, is_active_liveblog])

  return (
    <Pressable
      disabled={dummy}
      flex={1}
      onPress={navigateTo}
      testID={`NewsListItem${id}Button`}>
      <Box insetHorizontal="md">
        <Row gutter="smd">
          <Size width={100}>
            <LazyImage
              aspectRatio="narrow"
              fallbackInheritsAspectRatio
              missingSourceFallback={dummy ? <Fragment /> : undefined}
              source={images}
              testID={`NewsListItem${id}Image`}
            />
          </Size>
          <Column
            grow={1}
            shrink={1}>
            {!!is_active_liveblog && <LiveblogTag />}
            <Phrase
              numberOfLines={2}
              variant="small">
              {title}
            </Phrase>
            {!!includeDate && !is_active_liveblog && (
              <Phrase
                color="secondary"
                variant="small">
                {formatDateToDisplay(publication_datetime, false, false)}
              </Phrase>
            )}
          </Column>
        </Row>
      </Box>
    </Pressable>
  )
}
