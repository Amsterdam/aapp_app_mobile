import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {TransactionHistory} from '@/modules/city-pass/components/transactions/TransactionHistory'
import {SOMETHING_WENT_WRONG_TEXT} from '@/modules/city-pass/constants'
import {useGetBudgetTransactionsQuery} from '@/modules/city-pass/service'
import {CityPass, TransactionType} from '@/modules/city-pass/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDate} from '@/utils/datetime/formatDate'
import {getPreviousYear} from '@/utils/datetime/getPreviousYear'

type Props = {
  budgetCode: string
  dateEnd: CityPass['dateEnd']
  passNumber: CityPass['passNumber']
}

export const BudgetTransactions = ({
  budgetCode,
  dateEnd,
  passNumber,
}: Props) => {
  const {
    data: budgetTransactions,
    isLoading,
    isError,
    startedTimeStamp,
  } = useGetBudgetTransactionsQuery({passNumber, budgetCode})

  if (isLoading) {
    return (
      <PleaseWait
        startedTimeStamp={startedTimeStamp}
        testID="CityPassBudgetPleaseWait"
      />
    )
  }

  if (isError || !budgetTransactions) {
    return (
      <SomethingWentWrong
        testID="CityPassBudgetSomethingWentWrong"
        text={SOMETHING_WENT_WRONG_TEXT}
        title=""
      />
    )
  }

  const previousYear = getPreviousYear(dateEnd)
  const previousYearFormatted = formatDate(previousYear)

  const budgetTransactionsFiltered = budgetTransactions.filter(transaction =>
    previousYear.isBefore(dayjs(transaction.datePublished)),
  )

  return (
    <Column gutter="md">
      <Title text="Betalingen" />
      <Paragraph>
        Deze informatie kan 1 dag achterlopen. Het saldo dat je nog over hebt
        klopt altijd.
      </Paragraph>
      <TransactionHistory
        transactions={budgetTransactionsFiltered}
        type={TransactionType.budget}
      />
      <Paragraph textAlign="center">
        Dit zijn alle betalingen vanaf {previousYearFormatted}
      </Paragraph>
    </Column>
  )
}
