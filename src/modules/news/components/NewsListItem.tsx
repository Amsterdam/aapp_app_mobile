import type {NewsArticleBase} from '@/modules/news/types'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {NewsRouteName} from '@/modules/news/routes'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

type Props = NewsArticleBase

export const NewsListItem = ({
  id,
  images,
  publication_datetime,
  title,
}: Props) => {
  const {navigate} = useNavigation()

  return (
    <Pressable
      onPress={() => navigate(NewsRouteName.article, {id})}
      testID={`NewsListItem${id}Button`}>
      <Row gutter="smd">
        <LazyImage
          source={images}
          testID={`NewsListItem${id}Image`}
          width={100}
        />
        <Column>
          <Phrase variant="small">{title}</Phrase>
          <Phrase
            color="secondary"
            variant="small">
            {formatDateToDisplay(publication_datetime, false, false)}
          </Phrase>
        </Column>
      </Row>
    </Pressable>
  )
}
