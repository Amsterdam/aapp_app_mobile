import {useCallback, type ReactElement} from 'react'
import {type ListRenderItem, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {FlatGrid, type FlatGridProps} from 'react-native-super-grid'
import type {ProjectsItem} from '@/modules/construction-work/types/api'
import type {ProjectsListItem} from '@/modules/construction-work/types/project'
import type {SerializedError} from '@reduxjs/toolkit'
import type {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ConstructionWorkFigure} from '@/components/ui/media/errors/ConstructionWorkFigure'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useSearchField} from '@/hooks/useSearchField'
import {ListEmptyComponent} from '@/modules/construction-work/components/projects/ListEmptyComponent'
import {Project} from '@/modules/construction-work/components/projects/Project'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/slice'
import {PiwikDimension} from '@/processes/piwik/types'
import {useTheme} from '@/themes/useTheme'

const DEFAULT_NO_RESULTS_MESSAGE = 'We hebben geen werkzaamheden gevonden.'
const UNINTENDED_SPACING_FROM_RN_SUPER_GRID = 16

const keyExtractor = ({id}: ProjectsListItem) => id.toString()

type Props = {
  byDistance?: boolean
  data?: ProjectsListItem[]
  error?: FetchBaseQueryError | SerializedError
  isError: boolean
  isLoading: boolean
  listHeader?: ReactElement
  noResultsMessage?: string
  onItemsPerRowChange?: FlatGridProps<ProjectsItem>['onItemsPerRowChange']
  onViewableItemsChanged?: FlatGridProps<ProjectsItem>['onViewableItemsChanged']
  searchText?: string
}

export const ProjectsList = ({
  byDistance = false,
  data,
  isError,
  isLoading,
  onItemsPerRowChange,
  onViewableItemsChanged,
  searchText,
  listHeader,
  noResultsMessage = DEFAULT_NO_RESULTS_MESSAGE,
  error,
}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()
  const {
    type: searchType,
    amount: searchResultAmount,
    setSearchFieldValue,
    value,
  } = useSearchField()

  const {bottom: paddingBottom} = useSafeAreaInsets()
  const {fontScale} = useDeviceContext()
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const renderItem: ListRenderItem<ProjectsListItem> = useCallback(
    ({item}) => (
      <Project
        logDimensions={{
          [PiwikDimension.searchTerm]: value,
          [PiwikDimension.searchType]: searchType,
          [PiwikDimension.searchResultAmount]: searchResultAmount.toString(),
        }}
        onPress={(id, isDummyItem) => {
          if (isDummyItem) {
            return
          }

          setSearchFieldValue('')
          navigation.navigate(ConstructionWorkRouteName.project, {
            id,
          })
        }}
        project={item}
        readArticles={readArticles}
        showTraits={!searchText && (byDistance || item.followed)}
      />
    ),
    [
      byDistance,
      navigation,
      readArticles,
      setSearchFieldValue,
      searchResultAmount,
      searchText,
      searchType,
      value,
    ],
  )

  if (isError && !data?.length) {
    return (
      <FullScreenError
        buttonLabel="Ga terug"
        error={error}
        Image={ConstructionWorkFigure}
        onPress={() => navigation.goBack()}
        testID="ConstructionWorkFullScreenError"
        title="Er zijn geen werkzaamheden beschikbaar"
      />
    )
  }

  return (
    <FlatGrid
      contentContainerStyle={{paddingBottom}}
      data={data ?? []}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyboardDismissMode="on-drag"
      keyExtractor={keyExtractor}
      ListEmptyComponent={
        <ListEmptyComponent
          isLoading={isLoading}
          noResultsMessage={noResultsMessage}
          searchText={searchText ?? ''}
        />
      }
      ListHeaderComponent={listHeader}
      onItemsPerRowChange={onItemsPerRowChange}
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={renderItem}
      scrollIndicatorInsets={{right: Number.MIN_VALUE}}
      spacing={size.spacing.md}
      style={styles.gridView}
      testID="ConstructionWorkProjectsList"
    />
  )
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: -UNINTENDED_SPACING_FROM_RN_SUPER_GRID,
  },
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
