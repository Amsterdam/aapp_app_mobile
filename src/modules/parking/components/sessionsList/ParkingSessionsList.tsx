import {type ComponentType, useCallback, useState} from 'react'
import {FlatList, StyleSheet, type FlatListProps} from 'react-native'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {ParkingSessionListRenderItem} from '@/modules/parking/components/sessionsList/ParkingSessionListRenderItem'
import {ParkingSessionsSectionList} from '@/modules/parking/components/sessionsList/ParkingSessionSectionList'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {parkingApi} from '@/modules/parking/service'
import {
  ParkingEndpointName,
  ParkingSession,
  ParkingSessionOrDummy,
  ParkingSessionsEndpointRequest,
  ParkingSessionStatus,
} from '@/modules/parking/types'
import {layoutStyles} from '@/styles/layoutStyles'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {getCurrentPage} from '@/utils/pagination/getCurrentPage'

type Props = {
  ListEmptyComponent?: ComponentType
  inSections?: boolean
  sortAscending?: boolean
  status: ParkingSessionStatus
}

const pageSize = 40

const useParkingSessionsInfiniteScroller = ({
  sortAscending,
  status,
}: {
  sortAscending?: boolean
  status: ParkingSessionStatus
}) => {
  const currentPermit = useCurrentParkingPermit()
  const [viewableItemIndex, setViewableItemIndex] = useState(1)
  const page = getCurrentPage(viewableItemIndex, 1, pageSize)

  const defaultEmptyItem: ParkingSession = {
    start_date_time: sortAscending
      ? '2038-01-01T00:00:00'
      : '1970-01-01T00:00:00',
    ps_right_id: -1,
    vehicle_id: '',
    end_date_time: '',
    no_endtime: false,
    remaining_time: 0,
    report_code: '',
    status: ParkingSessionStatus.active,
    created_date_time: '',
    is_cancelled: false,
    is_paid: false,
    parking_cost: {
      currency: '',
      value: 0,
    },
  }

  const result = useInfiniteScroller<
    ParkingSession,
    ParkingSessionsEndpointRequest
  >(
    defaultEmptyItem,
    parkingApi.endpoints[ParkingEndpointName.parkingSessions],
    'ps_right_id',
    page,
    pageSize,
    {
      page_size: pageSize,
      report_code: currentPermit.report_code.toString(),
      status,
    },
  )

  const onViewableItemsChanged = useCallback<
    NonNullable<FlatListProps<ParkingSessionOrDummy>['onViewableItemsChanged']>
  >(
    ({viewableItems}) => {
      if (viewableItems.length > 0) {
        const items = viewableItems
          .flatMap(section => section.item)
          .filter(item => item.ps_right_id)

        if (items.length === 0) {
          return
        }

        const firstIndex = result.data.findIndex(
          item => item.ps_right_id === items[0]?.ps_right_id,
        )
        const lastIndex = result.data.findIndex(
          item => item.ps_right_id === items.at(-1)?.ps_right_id,
        )

        if (firstIndex >= 0 && lastIndex >= 0) {
          setViewableItemIndex(Math.round((firstIndex + lastIndex) / 2))
        }
      }
    },
    [result.data],
  )

  return {
    onViewableItemsChanged,
    ...result,
  }
}

export const ParkingSessionsList = ({
  ListEmptyComponent,
  sortAscending = false,
  status,
  inSections = false,
}: Props) => {
  const styles = useThemable(createStyles)
  const {data, isLoading, onViewableItemsChanged} =
    useParkingSessionsInfiniteScroller({status, sortAscending})

  return inSections ? (
    <ParkingSessionsSectionList
      isLoading={isLoading}
      ListEmptyComponent={ListEmptyComponent}
      onViewableItemsChanged={onViewableItemsChanged}
      sessions={data}
      sortAscending={sortAscending}
    />
  ) : (
    <FlatList
      contentContainerStyle={[layoutStyles.grow, styles.container]}
      data={data}
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
