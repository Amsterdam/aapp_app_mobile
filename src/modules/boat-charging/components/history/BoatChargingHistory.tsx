import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo, useState} from 'react'
import {SectionList, type SectionListProps} from 'react-native'
import {Divider} from '@/components/ui/Divider'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {BoatChargingHistoryEmpty} from '@/modules/boat-charging/components/history/BoatChargingHistoryEmpty'
import {BoatChargingHistoryItem} from '@/modules/boat-charging/components/history/BoatChargingHistoryItem'
import {BoatChargingHistoryLogin} from '@/modules/boat-charging/components/history/BoatChargingHistoryLogin'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {
  boatChargingApi,
  useBoatChargingSessionsQuery,
} from '@/modules/boat-charging/service'
import {
  BoatChargingEndpointName,
  NRGStatus,
  type BoatChargingSession,
  SessionStatus,
} from '@/modules/boat-charging/types'
import {layoutStyles} from '@/styles/layoutStyles'
import {getCurrentPage} from '@/utils/pagination/getCurrentPage'
import {
  dummyTitle,
  getSectionsSortedByDate,
} from '@/utils/sort/getSectionsSortedByDate'

const pageSize = 20

type BoatChargingHistoryInfiniteSession = BoatChargingSession & {page: number}

type BoatChargingHistoryInfiniteDummySession = {
  created_date_time: string
  currency: 'EUR'
  dummy: true
  end_date_time: string
  id: string
  kwh: number
  location: {name: string}
  nrg_status: NRGStatus
  page: number
  socket_number: string
  start_date_time: string
  station_id: string
  status: SessionStatus
  total_cost: number
}

type BoatChargingHistoryInfiniteItem =
  | (BoatChargingHistoryInfiniteSession & {dummy?: never})
  | BoatChargingHistoryInfiniteDummySession

type BoatChargingHistoryInfiniteSection = {
  data: BoatChargingHistoryInfiniteItem[]
  title: string
}

const hasDummyFlag = (
  session: BoatChargingHistoryInfiniteItem,
): session is Extract<BoatChargingHistoryInfiniteItem, {dummy: true}> =>
  'dummy' in session && session.dummy === true

const isCompletedOrDummySession = (
  session: BoatChargingHistoryInfiniteItem,
): session is BoatChargingHistoryInfiniteItem =>
  hasDummyFlag(session) || session.status === SessionStatus.COMPLETED

const dummyBoatChargingHistoryItem: BoatChargingHistoryInfiniteItem = {
  created_date_time: '1970-01-01T00:00:00Z',
  currency: 'EUR',
  dummy: true,
  end_date_time: '1970-01-01T00:00:00Z',
  id: '',
  kwh: 0,
  location: {name: ''},
  nrg_status: NRGStatus.Created,
  page: 0,
  socket_number: '',
  start_date_time: '1970-01-01T00:00:00Z',
  station_id: '',
  status: SessionStatus.COMPLETED,
  total_cost: 0,
}

export const BoatChargingHistory = () => {
  const {isLoggedIn} = useIsLoggedIn()
  const [viewableItemIndex, setViewableItemIndex] = useState(1)
  const page = getCurrentPage(viewableItemIndex, 1, pageSize)

  const result = useInfiniteScroller(
    dummyBoatChargingHistoryItem,
    boatChargingApi.endpoints[BoatChargingEndpointName.boatChargingSessions],
    'id',
    useBoatChargingSessionsQuery,
    page,
    pageSize,
    isLoggedIn
      ? {
          page_size: pageSize,
          status: SessionStatus.COMPLETED,
        }
      : skipToken,
  )

  const onViewableItemsChanged = useCallback<
    NonNullable<
      SectionListProps<
        BoatChargingHistoryInfiniteItem,
        BoatChargingHistoryInfiniteSection
      >['onViewableItemsChanged']
    >
  >(
    ({viewableItems}) => {
      if (viewableItems.length > 0) {
        const items = viewableItems
          .flatMap(section => section.item)
          .filter(item => item.id)

        if (items.length === 0) {
          return
        }

        const firstIndex = result.data.findIndex(
          item => item.id === items[0]?.id,
        )
        const lastIndex = result.data.findIndex(
          item => item.id === items[items.length - 1]?.id,
        )

        if (firstIndex !== -1 && lastIndex !== -1) {
          setViewableItemIndex(Math.round((firstIndex + lastIndex) / 2))
        }
      }
    },
    [result.data],
  )

  const history = useMemo(
    () => result.data.filter(isCompletedOrDummySession),
    [result.data],
  )

  const sections = useMemo<BoatChargingHistoryInfiniteSection[]>(
    () => getSectionsSortedByDate(history, false),
    [history],
  )

  if (!isLoggedIn) {
    return <BoatChargingHistoryLogin />
  }

  if (result.isLoading && result.data.length === 0) {
    return <PleaseWait testID="BoatChargingHistoryPleaseWait" />
  }

  if (result.isError) {
    return <SomethingWentWrong testID="BoatChargingHistorySomethingWentWrong" />
  }

  return (
    <SectionList
      contentContainerStyle={layoutStyles.grow}
      keyExtractor={({id}) => id}
      ListEmptyComponent={
        result.isLoading ? null : <BoatChargingHistoryEmpty />
      }
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={({item}) => <BoatChargingHistoryItem session={item} />}
      renderSectionFooter={() => <Gutter height="md" />}
      renderSectionHeader={({section}) => (
        <>
          {section !== sections[0] && (
            <>
              <Divider />
              <Gutter height="md" />
            </>
          )}
          <Phrase
            emphasis="strong"
            testID="BoatChargingHistorySessionDatePhrase">
            {section.title === dummyTitle ? ' ' : section.title}
          </Phrase>
        </>
      )}
      sections={sections}
      stickySectionHeadersEnabled={false}
    />
  )
}
