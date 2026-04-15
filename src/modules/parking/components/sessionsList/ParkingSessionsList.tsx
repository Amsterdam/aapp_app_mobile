import {type ComponentType, useCallback, useMemo, useState} from 'react'
import {FlatList, SectionList, SectionListProps} from 'react-native'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {getCurrentPage} from '@/modules/construction-work/components/projects/utils/getCurrentPage'
import {ParkingSessionListRenderItem} from '@/modules/parking/components/sessionsList/ParkingSessionListRenderItem'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {parkingApi, useParkingSessionsQuery} from '@/modules/parking/service'
import {
  ParkingEndpointName,
  ParkingSession,
  ParkingSessionOrDummy,
  ParkingSessionsEndpointRequest,
  ParkingSessionStatus,
} from '@/modules/parking/types'
import {
  Section,
  dummyTitle,
  groupParkingSessionsByDate,
} from '@/modules/parking/utils/groupParkingSessionsByDate'

type Props = {
  ListEmptyComponent?: ComponentType
  ListHeaderComponent?: ComponentType
  sortAscending?: boolean
  status: ParkingSessionStatus
}

const pageSize = 20

export const ParkingSessionsList = ({
  ListEmptyComponent,
  ListHeaderComponent,
  sortAscending = false,
  status,
}: Props) => {
  const isSessionHistory = status === ParkingSessionStatus.completed
  const currentPermit = useCurrentParkingPermit()

  const [viewableItemIndex, setViewableItemIndex] = useState(1)
  const page = getCurrentPage(viewableItemIndex, 1, pageSize)

  const result = useInfiniteScroller<
    ParkingSession,
    ParkingSession & {dummy: true},
    ParkingSessionsEndpointRequest
  >(
    {
      start_date_time: sortAscending
        ? '2038-01-01T00:00:00'
        : '1970-01-01T00:00:00',
      ps_right_id: -1,
      vehicle_id: '',
      dummy: true,
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
    },
    parkingApi.endpoints[ParkingEndpointName.parkingSessions],
    'ps_right_id',
    useParkingSessionsQuery,
    page,
    pageSize,
    {
      page_size: pageSize,
      report_code: currentPermit.report_code.toString(),
      status: isSessionHistory ? undefined : status,
    },
  )

  const onViewableItemsChanged = useCallback<
    NonNullable<
      SectionListProps<
        ParkingSessionOrDummy,
        Section<ParkingSessionOrDummy>
      >['onViewableItemsChanged']
    >
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
          item => item.ps_right_id === items[items.length - 1]?.ps_right_id,
        )

        if (firstIndex && lastIndex) {
          setViewableItemIndex(Math.round((firstIndex + lastIndex) / 2))
        }
      }
    },
    [result.data],
  )

  const sections = useMemo(
    () =>
      groupParkingSessionsByDate<ParkingSessionOrDummy>(
        result.data,
        sortAscending,
      ),
    [result, sortAscending],
  )

  return currentPermit.no_endtime ||
    currentPermit.max_session_length_in_days > 1 ? (
    <FlatList
      data={result.data}
      ListEmptyComponent={result.isLoading ? null : ListEmptyComponent}
      ListFooterComponent={<Gutter height="md" />}
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={({item}) => <ParkingSessionListRenderItem item={item} />}
    />
  ) : (
    <SectionList
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
