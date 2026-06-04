import type {NewsArticleBase} from '@/modules/news/types'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {LiveblogTag} from '@/modules/news/components/LiveblogTag'
import {NewsRouteName} from '@/modules/news/routes'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

type Props = NewsArticleBase & {includeDate?: boolean; isLiveBlog?: boolean}

export const NewsListItem = ({
  id,
  images,
  publication_datetime,
  title,
  includeDate = true,
  isLiveBlog = false, // TODO: fix prop once backend sends correct indicator
}: Props) => {
  const {navigate} = useNavigation()

  const showDate = includeDate && !isLiveBlog

  return (
    <Pressable
      disabled={id === -1}
      flex={1}
      onPress={() => navigate(NewsRouteName.article, {id})}
      testID={`NewsListItem${id}Button`}>
      <Box insetHorizontal="md">
        <Row gutter="smd">
          <Size width={100}>
            <LazyImage
              aspectRatio="narrow"
              fallbackInheritsAspectRatio
              source={images}
              testID={`NewsListItem${id}Image`}
            />
          </Size>
          <Column
            grow={1}
            shrink={1}>
            {!!isLiveBlog && <LiveblogTag />}
            <Phrase
              numberOfLines={2}
              variant="small">
              {title}
            </Phrase>
            {!!showDate && (
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
