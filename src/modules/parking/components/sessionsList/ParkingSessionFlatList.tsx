import type {ComponentType} from 'react'
import {FlatList, StyleSheet, type FlatListProps} from 'react-native'
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
  const styles = useThemable(createStyles)

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

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: size.spacing.md,
    },
  })
