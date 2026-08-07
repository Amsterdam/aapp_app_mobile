import {useCallback, useMemo, useState} from 'react'
import {SectionList, SectionListProps} from 'react-native'
import {EmptyList} from '@/components/features/EmptyList'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {parkingApi} from '@/modules/parking/service'
import {
  ParkingEndpointName,
  ParkingOrderType,
  ParkingSessionStatus,
  ParkingTransaction,
  ParkingTransactionsEndpointRequest,
} from '@/modules/parking/types'
import {layoutStyles} from '@/styles/layoutStyles'
import {formatNumber} from '@/utils/formatNumber'
import {getSectionsSortedByDate} from '@/utils/sort/getSectionsSortedByDate'

const ListEmptyComponent = () => (
  <EmptyList
    testID="ParkingMoneyTransactionsEmptyList"
    text="U heeft nog geen geld toegevoegd."
    title="Geen betalingen"
  />
)

type ParkingTransactionOrDummy = ParkingTransaction & {
  dummy?: boolean
  page: number
}

type Section = {
  data: Array<ParkingTransactionOrDummy>
  title: string
}

const dummyTitle = 'dummy'

const pageSize = 20

export const ParkingMoneyTransactionsList = () => {
  const [page, setPage] = useState(1)

  const result = useInfiniteScroller<
    ParkingTransaction,
    ParkingTransactionsEndpointRequest
  >(
    {
      created_date_time: '1970-01-01T00:00:00',
      dummy: true,
      ps_right_id: 0,
      start_date_time: '',
      end_date_time: '',
      no_endtime: false,
      remaining_time: 0,
      report_code: '',
      status: ParkingSessionStatus.cancelled,
      vehicle_id: '',
      is_cancelled: false,
      is_paid: false,
      parking_cost: {
        currency: '',
        value: 0,
      },
      amount: {
        currency: '',
        value: 0,
      },
    },
    parkingApi.endpoints[ParkingEndpointName.parkingTransactions],
    'created_date_time',
    page,
    pageSize,
    {
      page_size: pageSize,
    },
  )

  const onViewableItemsChanged = useCallback<
    NonNullable<
      SectionListProps<
        ParkingTransactionOrDummy,
        Section
      >['onViewableItemsChanged']
    >
  >(
    ({viewableItems}) => {
      if (viewableItems.length > 0) {
        const items = viewableItems
          .flatMap(section => section.item)
          .filter(item => item.created_date_time)

        if (items.length === 0) {
          return
        }

        const lastViewableItems = items[items.length - 1]
        let newPage = lastViewableItems?.page

        if (lastViewableItems?.dummy && newPage) {
          const firstDummy = result.data.find(item => !!item.dummy)

          if (firstDummy && firstDummy.page < newPage) {
            newPage = firstDummy.page
          }
        }

        if (newPage) {
          setPage(newPage)
        }
      }
    },
    [result.data],
  )

  const sections = useMemo(() => {
    const transactionsOnly = result.data.filter(
      item => item.dummy || item.order_type === ParkingOrderType.recharge,
    )

    return getSectionsSortedByDate(transactionsOnly, false)
  }, [result])

  return (
    <SectionList
      contentContainerStyle={layoutStyles.grow}
      ListEmptyComponent={result.isLoading ? null : ListEmptyComponent}
      ListHeaderComponent={
        sections.length > 0 ? (
          <Box
            insetBottom="md"
            insetHorizontal="md"
            insetTop="md">
            <Row align="between">
              <Phrase emphasis="strong">Omschrijving</Phrase>
              <Phrase emphasis="strong">Bedrag</Phrase>
            </Row>
          </Box>
        ) : null
      }
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={({item}) =>
        item.dummy ? (
          <Box>
            <Skeleton isLoading>
              <Phrase accessible={false}>Laden...</Phrase>
            </Skeleton>
          </Box>
        ) : (
          <SingleSelectable>
            <Box
              insetBottom="md"
              insetHorizontal="md"
              insetTop="md">
              <Row align="between">
                <Phrase
                  accessible={false}
                  emphasis="strong">
                  {item.order_type === ParkingOrderType.recharge
                    ? 'Geldsaldo opwaarderen'
                    : 'Geldsaldo teruggevorderd'}
                </Phrase>
                <Phrase
                  accessible={false}
                  emphasis="strong"
                  flexShrink={0}>
                  {item.amount.value > 0 ? '+' : '-'}{' '}
                  {formatNumber(
                    Math.abs(item.amount.value),
                    item.amount.currency,
                  )}
                </Phrase>
              </Row>
            </Box>
          </SingleSelectable>
        )
      }
      renderSectionFooter={() => <Gutter height="md" />}
      renderSectionHeader={({section}) => (
        <Box insetHorizontal="md">
          <Border
            key={section.title}
            top>
            <Gutter height="md" />
            <Phrase testID="ParkingPlannedSessionDatePhrase">
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
