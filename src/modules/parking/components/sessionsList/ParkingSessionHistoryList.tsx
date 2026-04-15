import {type ComponentType, useCallback, useMemo, useState} from 'react'
import {SectionList, SectionListProps} from 'react-native'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {getCurrentPage} from '@/modules/construction-work/components/projects/utils/getCurrentPage'
import {ParkingSessionListRenderItem} from '@/modules/parking/components/sessionsList/ParkingSessionListRenderItem'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  parkingApi,
  useParkingSessionHistoryQuery,
} from '@/modules/parking/service'
import {
  ParkingEndpointName,
  ParkingHistorySession,
  ParkingOrderType,
  ParkingSessionsEndpointRequest,
} from '@/modules/parking/types'
import {
  dummyTitle,
  groupParkingSessionsByDate,
} from '@/modules/parking/utils/groupParkingSessionsByDate'

type ParkingHistorySessionOrDummy =
  | (ParkingHistorySession & {dummy?: never})
  | {dummy: true; ps_right_id: number; start_date_time: string}

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

  const result = useInfiniteScroller<
    ParkingHistorySession,
    ParkingHistorySessionOrDummy,
    ParkingSessionsEndpointRequest
  >(
    {
      start_date_time: sortAscending
        ? '2038-01-01T00:00:00'
        : '1970-01-01T00:00:00',
      dummy: true,
      ps_right_id: 0,
    },
    parkingApi.endpoints[ParkingEndpointName.parkingSessionHistory],
    'start_date_time',
    useParkingSessionHistoryQuery,
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

  const sections = useMemo(() => {
    const sessionsOnly = result.data.filter(
      item =>
        item.dummy ||
        item.order_type === undefined || // On v2 this property doesn't exist
        item.order_type === ParkingOrderType.session,
    )

    return groupParkingSessionsByDate(sessionsOnly, sortAscending)
  }, [result, sortAscending])

  return (
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
