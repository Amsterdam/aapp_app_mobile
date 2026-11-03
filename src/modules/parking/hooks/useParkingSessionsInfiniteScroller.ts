import {useCallback, useState} from 'react'
import type {FlatListProps} from 'react-native'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {parkingApi} from '@/modules/parking/service'
import {
  ParkingEndpointName,
  ParkingSession,
  ParkingSessionOrDummy,
  ParkingSessionsEndpointRequest,
  ParkingSessionStatus,
} from '@/modules/parking/types'
import {getCurrentPage} from '@/utils/pagination/getCurrentPage'

const PAGE_SIZE = 40

export const useParkingSessionsInfiniteScroller = ({
  sortAscending,
  status,
}: {
  sortAscending?: boolean
  status: ParkingSessionStatus
}) => {
  const currentPermit = useCurrentParkingPermit()
  const [viewableItemIndex, setViewableItemIndex] = useState(1)
  const page = getCurrentPage(viewableItemIndex, 1, PAGE_SIZE)

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
    PAGE_SIZE,
    {
      page_size: PAGE_SIZE,
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
