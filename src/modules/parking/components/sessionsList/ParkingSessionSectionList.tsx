import {type ComponentType, useMemo} from 'react'
import {SectionList, StyleSheet, type FlatListProps} from 'react-native'
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingSessionListRenderItem} from '@/modules/parking/components/sessionsList/ParkingSessionListRenderItem'
import {ParkingSessionOrDummy} from '@/modules/parking/types'
import {layoutStyles} from '@/styles/layoutStyles'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {
  dummyTitle,
  getSectionsSortedByDate,
} from '@/utils/sort/getSectionsSortedByDate'

type Props = {
  ListEmptyComponent?: ComponentType
  ListHeaderComponent?: ComponentType
  isLoading: boolean
  sessions?: ParkingSessionOrDummy[]
  sortAscending?: boolean
} & Pick<FlatListProps<ParkingSessionOrDummy>, 'onViewableItemsChanged'>

export const ParkingSessionsSectionList = ({
  ListEmptyComponent,
  ListHeaderComponent,
  sortAscending = false,
  sessions,
  onViewableItemsChanged,
  isLoading = false,
}: Props) => {
  const {bottom} = useSafeAreaInsets()
  const styles = useThemable(createStyles(bottom))

  const sections = useMemo(
    () =>
      getSectionsSortedByDate<ParkingSessionOrDummy>(sessions, sortAscending),
    [sortAscending, sessions],
  )

  return (
    <SectionList
      contentContainerStyle={[layoutStyles.grow, styles.container]}
      ListEmptyComponent={isLoading ? null : ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={({item}) => <ParkingSessionListRenderItem item={item} />}
      renderSectionFooter={() => <Gutter height="md" />}
      renderSectionHeader={({section}) => (
        <Box insetHorizontal="md">
          <Border
            key={section.title}
            top>
            <Gutter height="md" />
            <Phrase
              emphasis="strong"
              testID="ParkingSessionDatePhrase">
              {section.title === dummyTitle ? ' ' : section.title}
            </Phrase>
          </Border>
        </Box>
      )}
      sections={sections}
      stickySectionHeadersEnabled={false}
    />
  )
}

const createStyles =
  (bottom: EdgeInsets['bottom']) =>
  ({size}: Theme) =>
    StyleSheet.create({
      container: {
        paddingBottom: Math.max(bottom, size.spacing.md),
      },
    })
