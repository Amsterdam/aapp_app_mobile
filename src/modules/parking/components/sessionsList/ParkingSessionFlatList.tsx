import type {ComponentType} from 'react'
import {FlatList, StyleSheet, type FlatListProps} from 'react-native'
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context'
import {ParkingSessionListRenderItem} from '@/modules/parking/components/sessionsList/ParkingSessionListRenderItem'
import {ParkingSessionOrDummy} from '@/modules/parking/types'
import {layoutStyles} from '@/styles/layoutStyles'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  ListEmptyComponent?: ComponentType
  isLoading: boolean
  sessions?: ParkingSessionOrDummy[]
} & Pick<FlatListProps<ParkingSessionOrDummy>, 'onViewableItemsChanged'>

export const ParkingSessionsFlatList = ({
  ListEmptyComponent,
  sessions,
  onViewableItemsChanged,
  isLoading = false,
}: Props) => {
  const {bottom} = useSafeAreaInsets()
  const styles = useThemable(createStyles(bottom))

  return (
    <FlatList
      contentContainerStyle={[layoutStyles.grow, styles.container]}
      data={sessions}
      ListEmptyComponent={isLoading ? null : ListEmptyComponent}
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={({item}) => <ParkingSessionListRenderItem item={item} />}
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
