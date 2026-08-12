import {type ComponentType, useCallback, useMemo, useState} from 'react'
import {SectionList, SectionListProps} from 'react-native'
import type {WithDummyAndPage} from '@/services/types'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {ParkingSessionListRenderItem} from '@/modules/parking/components/sessionsList/ParkingSessionListRenderItem'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {parkingApi} from '@/modules/parking/service'
import {
  ParkingEndpointName,
  ParkingHistorySession,
  ParkingSessionsEndpointRequest,
  ParkingSessionStatus,
} from '@/modules/parking/types'
import {layoutStyles} from '@/styles/layoutStyles'
import {getCurrentPage} from '@/utils/pagination/getCurrentPage'
import {
  dummyTitle,
  getSectionsSortedByDate,
} from '@/utils/sort/getSectionsSortedByDate'

type ParkingHistorySessionOrDummy = WithDummyAndPage<ParkingHistorySession>

type Props = {
  ListEmptyComponent?: ComponentType
  ListHeaderComponent?: ComponentType
  sortAscending?: boolean
}

const pageSize = 40

export const ParkingSessionHistoryList = ({
  ListEmptyComponent,
  ListHeaderComponent,
  sortAscending = false,
}: Props) => {
  const currentPermit = useCurrentParkingPermit()
  const [viewableItemIndex, setViewableItemIndex] = useState(1)
  const page = getCurrentPage(viewableItemIndex, 1, pageSize)

  const defaultEmptyItem: ParkingHistorySession = {
    start_date_time: sortAscending
      ? '2038-01-01T00:00:00'
      : '1970-01-01T00:00:00',
    ps_right_id: 0,
    end_date_time: '',
    no_endtime: false,
    remaining_time: 0,
    report_code: '',
    status: ParkingSessionStatus.planned,
    vehicle_id: '',
    created_date_time: '',
    is_cancelled: false,
    parking_cost: {
      currency: '',
      value: 0,
    },
    amount: {
      currency: '',
      value: 0,
    },
  }

  const result = useInfiniteScroller<
    ParkingHistorySession,
    ParkingSessionsEndpointRequest
  >(
    defaultEmptyItem,
    parkingApi.endpoints[ParkingEndpointName.parkingSessionHistory],
    'ps_right_id',
    page,
    pageSize,
    {
      page_size: pageSize,
      report_code: currentPermit.report_code.toString(),
    },
  )

  const onViewableItemsChanged = useCallback<
    NonNullable<
      SectionListProps<
        ParkingHistorySessionOrDummy,
        ParkingHistorySession
      >['onViewableItemsChanged']
    >
  >(
    ({viewableItems}) => {
      if (viewableItems.length > 0) {
        const items = viewableItems.flatMap(section => section.item)

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

  const sections = useMemo(
    () => getSectionsSortedByDate(result.data, sortAscending),
    [result, sortAscending],
  )

  return (
    <SectionList
      contentContainerStyle={layoutStyles.grow}
      ListEmptyComponent={result.isLoading ? null : ListEmptyComponent}
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
              testID="ParkingPlannedSessionDatePhrase">
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
