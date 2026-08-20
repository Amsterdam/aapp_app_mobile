import {useMemo} from 'react'
import {Border} from '@/components/ui/containers/Border'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {TransactionItem} from '@/modules/city-pass/components/transactions/TransactionItem'
import {Transactions, TransactionType} from '@/modules/city-pass/types'
import {
  getTransactionsByDate,
  mapTransactions,
} from '@/modules/city-pass/utils/transactionUtils'

const NoTransactions = ({text}: {text: string}) => (
  <Border bottom>
    <Box insetBottom="md">
      <Phrase
        color="secondary"
        testID="CityPassTransactionHistoryNoTransactionsPhrase">
        {text}
      </Phrase>
    </Box>
  </Border>
)

type Props = {
  transactions: Transactions
  type: TransactionType
}

export const TransactionHistory = ({transactions, type}: Props) => {
  const transactionsByDate = useMemo(
    () => getTransactionsByDate(mapTransactions(transactions, type)),
    [transactions, type],
  )

  return (
    <Column gutter="md">
      <Border bottom>
        <Box insetBottom="sm">
          <SingleSelectable
            accessibilityLabel={`Hieronder volgt een overzicht van jouw ${type === TransactionType.discount ? 'acties en het bedrag dat je bespaard hebt.' : 'betalingen en het bedrag dat je hebt uitgegeven.'}`}
            accessibilityRole="header"
            testID="CityPassTransactionHistoryTableHeader">
            <Row align="between">
              <Phrase
                accessible={false}
                emphasis="strong"
                testID="CityPassTransactionHistoryTableHeaderDescription">
                Omschrijving
              </Phrase>
              <Phrase
                accessible={false}
                emphasis="strong"
                testID="CityPassTransactionHistoryTableHeaderValue">
                {type === TransactionType.discount ? 'Besparing' : 'Bedrag'}
              </Phrase>
            </Row>
          </SingleSelectable>
        </Box>
      </Border>
      {transactionsByDate.length ? (
        transactionsByDate.map(dateGroup => (
          <Border
            bottom
            key={dateGroup.date}>
            <Box insetBottom="lg">
              <SingleSelectable>
                <Column gutter="sm">
                  <Phrase
                    accessible={false}
                    color="secondary"
                    testID="CityPassTransactionHistoryDatePhrase">
                    {dateGroup.date}
                  </Phrase>
                  {dateGroup.data.map(transaction => (
                    <TransactionItem
                      key={transaction.id}
                      {...transaction}
                      accessible={false}
                    />
                  ))}
                </Column>
              </SingleSelectable>
            </Box>
          </Border>
        ))
      ) : (
        <NoTransactions
          text={
            type === TransactionType.discount
              ? 'Geen acties'
              : 'Geen betalingen'
          }
        />
      )}
    </Column>
  )
}
