import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo, useState} from 'react'
import {SectionList, StyleSheet, type SectionListProps} from 'react-native'
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context'
import {Box} from '@/components/ui/containers/Box'
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
import {boatChargingApi} from '@/modules/boat-charging/service'
import {
  BoatChargingEndpointName,
  NRGStatus,
  SessionStatus,
  type BoatChargingHistoryInfiniteItem,
  type BoatChargingLocation,
} from '@/modules/boat-charging/types'
import {layoutStyles} from '@/styles/layoutStyles'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import type {NonOptional} from '@/types/utils'
import {getCurrentPage} from '@/utils/pagination/getCurrentPage'
import {
  dummyTitle,
  getSectionsSortedByDate,
} from '@/utils/sort/getSectionsSortedByDate'

const PAGE_SIZE = 20

type BoatChargingHistoryInfiniteItemWithStartTime = NonOptional<
  BoatChargingHistoryInfiniteItem,
  'start_date_time'
>
type BoatChargingHistoryInfiniteSection = {
  data: BoatChargingHistoryInfiniteItemWithStartTime[]
  title: string
}

const hasDummyFlag = (
  session: BoatChargingHistoryInfiniteItem,
): session is Extract<BoatChargingHistoryInfiniteItem, {dummy: true}> =>
  'dummy' in session && session.dummy === true

const isCompletedOrDummySession = (
  session: BoatChargingHistoryInfiniteItem,
): session is BoatChargingHistoryInfiniteItemWithStartTime =>
  (hasDummyFlag(session) || session.status === SessionStatus.COMPLETED) &&
  (!!session.start_date_time || !!session.created_date_time)

const dummyBoatChargingHistoryItem: BoatChargingHistoryInfiniteItemWithStartTime =
  {
    created_date_time: '1970-01-01T00:00:00Z',
    currency: 'EUR',
    end_date_time: '1970-01-01T00:00:00Z',
    id: '',
    kwh: 0,
    location: {name: '', address: {}} as BoatChargingLocation,
    nrg_status: NRGStatus.Created,
    page: 0,
    socket_number: '',
    start_date_time: '1970-01-01T00:00:00Z',
    station_id: '',
    status: SessionStatus.COMPLETED,
    total_cost_incl_vat: 0,
    email: '',
  }

export const BoatChargingHistory = () => {
  const {isLoggedIn} = useIsLoggedIn()
  const [viewableItemIndex, setViewableItemIndex] = useState(1)
  const page = getCurrentPage(viewableItemIndex, 1, PAGE_SIZE)
  const {bottom} = useSafeAreaInsets()
  const styles = useThemable(createStyles(bottom))

  const result = useInfiniteScroller(
    dummyBoatChargingHistoryItem,
    boatChargingApi.endpoints[BoatChargingEndpointName.boatChargingSessions],
    'id',
    page,
    PAGE_SIZE,
    isLoggedIn
      ? {
          page_size: PAGE_SIZE,
          status: SessionStatus.COMPLETED,
        }
      : skipToken,
  )

  const onViewableItemsChanged = useCallback<
    NonNullable<
      SectionListProps<
        BoatChargingHistoryInfiniteItemWithStartTime,
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

  const history = useMemo<BoatChargingHistoryInfiniteItemWithStartTime[]>(
    () =>
      result.data.filter(isCompletedOrDummySession).map(item => ({
        ...item,
        start_date_time: item.start_date_time || item.created_date_time,
      })),
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
    return (
      <PleaseWait
        showFeedback
        testID="BoatChargingHistoryPleaseWait"
      />
    )
  }

  if (result.isError) {
    return (
      <Box>
        <SomethingWentWrong
          retryFn={result.retry}
          testID="BoatChargingHistorySomethingWentWrong"
        />
      </Box>
    )
  }

  return (
    <SectionList
      contentContainerStyle={[layoutStyles.grow, styles.container]}
      keyExtractor={({id}) => id}
      ListEmptyComponent={
        result.isLoading ? null : <BoatChargingHistoryEmpty />
      }
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={({item}) => <BoatChargingHistoryItem session={item} />}
      renderSectionFooter={() => <Gutter height="md" />}
      renderSectionHeader={({section}) => (
        <Box insetHorizontal="md">
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
