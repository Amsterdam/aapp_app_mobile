import {useCallback, useState} from 'react'
import type {ProjectsListItem} from '@/modules/construction-work/types/project'
import type {FlatGridProps} from 'react-native-super-grid'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {getAddressParam} from '@/modules/address/utils/getAddressParam'
import {ProjectsList} from '@/modules/construction-work/components/projects/ProjectsList'
import {ProjectsListHeader} from '@/modules/construction-work/components/projects/ProjectsListHeader'
import {config} from '@/modules/construction-work/components/projects/config'
import {getCurrentPage} from '@/modules/construction-work/components/projects/utils/getCurrentPage'
import {
  projectsApi,
  useProjectsQuery,
} from '@/modules/construction-work/service'
import {
  type ProjectsItem,
  type ProjectsQueryArgs,
  ConstructionWorkEndpointName,
} from '@/modules/construction-work/types/api'
import {ModuleSlug} from '@/modules/slugs'
import {SearchFieldProvider} from '@/providers/searchField.provider'

const emptyProjectsItem: ProjectsListItem = {
  followed: false,
  image: null,
  meter: 0,
  id: -1,
  isDummyItem: true,
  recent_articles: [],
  subtitle: ' ',
  title: ' ',
}

export const Projects = () => {
  const {address} = useSelectedAddress(ModuleSlug['construction-work'])
  const addressParam = getAddressParam(address)
  const {projectItemListPageSize} = config
  const [itemsPerRow, setItemsPerRow] = useState(1)
  const [viewableItemIndex, setViewableItemIndex] = useState(1)
  const page = getCurrentPage(
    viewableItemIndex,
    itemsPerRow,
    projectItemListPageSize,
  )

  const result = useInfiniteScroller<
    ProjectsItem,
    ProjectsListItem,
    ProjectsQueryArgs
  >(
    emptyProjectsItem,
    projectsApi.endpoints[ConstructionWorkEndpointName.projects],
    'id',
    useProjectsQuery,
    page,
    projectItemListPageSize,
    {
      page_size: projectItemListPageSize,
      ...addressParam,
    },
  )

  const onViewableItemsChanged = useCallback<
    NonNullable<FlatGridProps<ProjectsItem>['onViewableItemsChanged']>
  >(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const middleIndex = Math.floor(viewableItems.length / 2)
      const foundIndex = viewableItems[middleIndex].index

      if (foundIndex) {
        setViewableItemIndex(foundIndex)
      }
    }
  }, [])

  return (
    <HorizontalSafeArea>
      <SearchFieldProvider
        amount={result.data.length}
        type="projects">
        <ProjectsList
          {...result}
          byDistance={!!addressParam}
          listHeader={
            <ProjectsListHeader>
              <AddressSwitch
                highAccuracyPurposeKey={
                  HighAccuracyPurposeKey.PreciseLocationAddressConstructionWork
                }
                moduleSlug={ModuleSlug['construction-work']}
                testID="ConstructionWorkProjectsAddressSwitch"
              />
            </ProjectsListHeader>
          }
          noResultsMessage="We hebben geen werkzaamheden gevonden."
          onItemsPerRowChange={setItemsPerRow}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      </SearchFieldProvider>
    </HorizontalSafeArea>
  )
}
