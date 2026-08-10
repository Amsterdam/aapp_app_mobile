import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {TransactionHistory} from '@/modules/city-pass/components/transactions/TransactionHistory'
import {SOMETHING_WENT_WRONG_TEXT} from '@/modules/city-pass/constants'
import {useGetDiscountTransactionsQuery} from '@/modules/city-pass/service'
import {CityPass, TransactionType} from '@/modules/city-pass/types'
import {getCurrentPeriodStartDate} from '@/modules/city-pass/utils/getCurrentPeriodStartDate'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDate} from '@/utils/datetime/formatDate'
import {getPreviousYear} from '@/utils/datetime/getPreviousYear'
import {formatNumber} from '@/utils/formatNumber'

const DiscountTransactionsContent = ({
  dateEnd,
  passNumber,
  isActive,
}: Props) => {
  const {data, isLoading, isError, refetch, startedTimeStamp} =
    useGetDiscountTransactionsQuery({
      passNumber,
    })

  if (isLoading) {
    return (
      <PleaseWait
        startedTimeStamp={startedTimeStamp}
        testID="CityPassDiscountTransactionsPleaseWait"
      />
    )
  }

  if (isError || !data) {
    return (
      <SomethingWentWrong
        retryFn={refetch}
        testID="CityPassDiscountTransactionsSomethingWentWrong"
        text={SOMETHING_WENT_WRONG_TEXT}
        title=""
      />
    )
  }

  const {transactions} = data

  const previousYear = isActive
    ? getPreviousYear(dateEnd)
    : getCurrentPeriodStartDate()
  const previousYearFormatted = formatDate(previousYear)

  const transactionsFiltered = transactions.filter(transaction =>
    previousYear.isBefore(dayjs(transaction.datePublished)),
  )

  const discountAmountTotal = transactionsFiltered.reduce(
    (total, transaction) => total + transaction.discountAmount,
    0,
  )
  const discountAmountTotalFormatted = formatNumber(discountAmountTotal, 'EUR')

  return (
    <>
      <Paragraph>
        {`Vanaf ${previousYearFormatted} heb je in totaal ${discountAmountTotalFormatted} bespaard. Deze informatie kan 1 dag achterlopen.`}
      </Paragraph>
      <TransactionHistory
        transactions={transactionsFiltered}
        type={TransactionType.discount}
      />
      <Paragraph textAlign="center">
        Dit waren jouw acties vanaf {previousYearFormatted}
      </Paragraph>
    </>
  )
}

type Props = {
  dateEnd: CityPass['dateEnd']
  isActive: CityPass['actief']
  passNumber: CityPass['passNumber']
}

export const DiscountTransactions = ({
  dateEnd,
  passNumber,
  isActive,
}: Props) => (
  <Column gutter="md">
    <Title text="Mijn acties" />
    <DiscountTransactionsContent
      dateEnd={dateEnd}
      isActive={isActive}
      passNumber={passNumber}
    />
  </Column>
)
