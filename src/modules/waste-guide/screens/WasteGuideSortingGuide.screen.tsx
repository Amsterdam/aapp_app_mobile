import {skipToken} from '@reduxjs/toolkit/query'
import {FormProvider, useForm} from 'react-hook-form'
import {FlatList} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {SearchFieldControlled} from '@/components/ui/forms/SearchFieldControlled'
import {SearchResultsLabel} from '@/components/ui/forms/SearchResultsLabel'
import {AspectRatio} from '@/components/ui/layout/AspectRatio'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ListEmptyComponent} from '@/modules/construction-work/components/projects/ListEmptyComponent'
import {ProjectsListHeader} from '@/modules/construction-work/components/projects/ProjectsListHeader'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {useGetWasteGuideSortingGuideSearchQuery} from '@/modules/waste-guide/service'
import {
  sortingGuideMockData,
  sortingGuideOftenMistakenMockData,
} from '@/modules/waste-guide/sortingGuideMockData'
import {FractionCode} from '@/modules/waste-guide/types'

type FormFields = {
  searchTerm: string
}

type SortingGuideSearchResultItemProps = {
  index: number
  item: {fractions: FractionCode[]; image: string; name: string}
}

const SortingGuideSearchResultItem = ({
  item,
  index,
}: SortingGuideSearchResultItemProps) => {
  const {navigate} = useNavigation()

  return (
    <Pressable
      key={item.name}
      onPress={() =>
        navigate(WasteGuideRouteName.wasteGuideSortingGuideDetails)
      }
      testID={`WasteGuideSortingGuideSearchResult${index}Item`}>
      <Box
        insetHorizontal="md"
        insetVertical="smd">
        <Row
          flex={1}
          gutter="md">
          <Size width={100}>
            <AspectRatio aspectRatio="square">
              <LazyImage
                aspectRatio="square"
                fallbackInheritsAspectRatio={false}
                source={{uri: item.image}}
                testID="ConstructionWorkProjectImage"
              />
            </AspectRatio>
          </Size>

          <Column>
            <Title
              level="h4"
              text={item.name}
            />
            <Column>
              {item.fractions.map(fractionCode => (
                <Row
                  gutter="sm"
                  key={fractionCode}>
                  <Phrase>{fractionCode}</Phrase>
                  <WasteFractionIcon fractionCode={fractionCode} />
                </Row>
              ))}
            </Column>
          </Column>
        </Row>
      </Box>
    </Pressable>
  )
}

export const WasteGuideSortingGuideScreen = () => {
  const form = useForm<FormFields>()

  const {watch} = form
  const searchText = watch('searchTerm')
  const hasSearchText = Boolean(searchText)

  const {
    data: d,
    isError,
    isLoading,
  } = useGetWasteGuideSortingGuideSearchQuery(
    hasSearchText
      ? {
          text: searchText,
        }
      : skipToken,
  )

  console.log('data:', d, isError, isLoading)
  const data = hasSearchText ? sortingGuideMockData : undefined

  return (
    <FormProvider {...form}>
      <Screen
        scroll={false}
        testID="WasteGuideSortingGuideScreen">
        <FlatList
          data={data?.result ?? []}
          // isError={isError}
          keyboardDismissMode="on-drag"
          keyExtractor={item => item.name}
          ListEmptyComponent={
            <ListEmptyComponent
              fallback={
                <Box
                  insetHorizontal="no"
                  insetVertical="smd">
                  <Box
                    insetHorizontal="md"
                    insetVertical="no">
                    <Title text="Top 10 instinkers" />
                  </Box>
                  <Column>
                    {sortingGuideOftenMistakenMockData.map((item, index) => (
                      <SortingGuideSearchResultItem
                        index={index}
                        item={item}
                        key={item.name}
                      />
                    ))}
                  </Column>
                </Box>
              }
              isLoading={isLoading}
              noResultsMessage="We hebben niks gevonden voor deze zoekterm."
              searchText={searchText ?? ''}
            />
          }
          ListHeaderComponent={
            <ProjectsListHeader>
              <SearchFieldControlled<FormFields>
                name="searchTerm"
                placeholder="Wat wil je wegdoen?"
                testID="WasteGuideSortingGuideSearchField"
              />
              <SearchResultsLabel
                hasSearchText={hasSearchText}
                numberOfResults={data?.result.length ?? 0}
                testID="WasteGuideSortingGuideNumberOfSearchResultsText"
              />
            </ProjectsListHeader>
          }
          renderItem={({item, index}) => (
            <SortingGuideSearchResultItem
              index={index}
              item={item}
            />
          )}
        />
      </Screen>
    </FormProvider>
  )
}
