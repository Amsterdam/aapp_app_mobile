import {FlatList, StyleSheet} from 'react-native'
import type {NewsArticleBase} from '@/modules/news/types'
import type {Theme} from '@/themes/themes'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {LiveblogHeader} from '@/modules/news/components/liveblog/LiveblogHeader'
import {LiveblogItem} from '@/modules/news/components/liveblog/LiveblogItem'
import {LiveblogItemSeparator} from '@/modules/news/components/liveblog/LiveblogItemSeparator'
import {useLiveblog} from '@/modules/news/hooks/useLiveblog'
import {useThemable} from '@/themes/useThemable'

export const Liveblog = ({id}: {id: NewsArticleBase['id']}) => {
  const {data, isError, isLoading, ...rest} = useLiveblog(id)
  const styles = useThemable(createStyles)

  if (isLoading) {
    return <PleaseWait testID="LiveblogPleaseWait" />
  }

  if (isError || !data) {
    return <SomethingWentWrong testID="LiveblogSomethingWentWrong" />
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data.liveblog_items}
      ItemSeparatorComponent={LiveblogItemSeparator}
      keyExtractor={item => String(item.id)}
      ListHeaderComponent={
        <LiveblogHeader
          data={data}
          {...rest}
        />
      }
      renderItem={LiveblogItem}
    />
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.size.spacing.md,
      paddingBottom: theme.size.spacing.xl,
    },
  })
