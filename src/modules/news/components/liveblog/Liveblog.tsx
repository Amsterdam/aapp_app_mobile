import {useCallback, useLayoutEffect, useMemo} from 'react'
import {FlatList, StyleSheet, type ListRenderItemInfo} from 'react-native'
import type {
  LiveblogItem as LiveblogItemType,
  NewsArticleBase,
} from '@/modules/news/types'
import type {Theme} from '@/themes/themes'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {LiveblogActiveHeaderTitle} from '@/modules/news/components/liveblog/LiveblogActiveHeaderTitle'
import {LiveblogHeader} from '@/modules/news/components/liveblog/LiveblogHeader'
import {LiveblogItem} from '@/modules/news/components/liveblog/LiveblogItem'
import {LiveblogItemSeparator} from '@/modules/news/components/liveblog/LiveblogItemSeparator'
import {useLiveblog} from '@/modules/news/hooks/useLiveblog'
import {getLiveblogLastEntriesPerDay} from '@/modules/news/utils/getLiveblogLastEntriesPerDay'
import {useThemable} from '@/themes/useThemable'

export const Liveblog = ({id}: {id: NewsArticleBase['id']}) => {
  const {data, isError, isLoading, startedTimeStamp, ...rest} = useLiveblog(id)
  const styles = useThemable(createStyles)
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data?.is_active_liveblog
        ? LiveblogActiveHeaderTitle
        : 'Liveblog',
    })
  }, [navigation, data?.is_active_liveblog])

  const liveblogLastEntriesPerDay = useMemo<Set<LiveblogItemType>>(
    () => getLiveblogLastEntriesPerDay(data?.liveblog_items),
    [data?.liveblog_items],
  )

  const renderItem = useCallback(
    (props: ListRenderItemInfo<LiveblogItemType>) => (
      <LiveblogItem
        {...props}
        isLastEntryOfDay={liveblogLastEntriesPerDay.has(props.item)}
      />
    ),
    [liveblogLastEntriesPerDay],
  )

  if (isLoading) {
    return (
      <PleaseWait
        startedTimeStamp={startedTimeStamp}
        testID="LiveblogPleaseWait"
      />
    )
  }

  if (isError || !data) {
    return (
      <SomethingWentWrong
        inset="md"
        testID="LiveblogSomethingWentWrong"
      />
    )
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
      renderItem={renderItem}
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
