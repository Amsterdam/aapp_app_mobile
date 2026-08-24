import {StyleSheet, View} from 'react-native'
import type {NewsArticleBase} from '@/modules/news/types'
import type {Theme} from '@/themes/themes'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {LiveblogTag} from '@/modules/news/components/liveblog/LiveblogTag'
import {useThemable} from '@/themes/useThemable'

type Props = {
  isLiveblog?: boolean
  source: NewsArticleBase['images']
}

export const NewsDashboardHighlightedArticleImage = ({
  source,
  isLiveblog = false,
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.container}>
      <LazyImage
        aspectRatio="wide"
        fallbackInheritsAspectRatio
        source={source}
        testID="NewsDashboardHighlightedArticleImage"
      />
      {!!isLiveblog && (
        <View style={styles.tagContainer}>
          <LiveblogTag />
        </View>
      )}
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    tagContainer: {
      position: 'absolute',
      margin: theme.size.spacing.md,
      bottom: 0,
    },
  })
