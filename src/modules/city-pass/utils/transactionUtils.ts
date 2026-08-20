import {TransactionItemProps} from '@/modules/city-pass/components/transactions/TransactionItem'
import {
  Transactions,
  TransactionType,
  BudgetTransaction,
} from '@/modules/city-pass/types'
import {isToday} from '@/utils/datetime/isToday'

export type TransactionByDate = TransactionItemProps & {
  datePublished: string
  datePublishedFormatted: string
}

export type TransactionsByDate = {
  data: TransactionByDate[]
  date: string
}

export const getTransactionsByDate = (transactions: TransactionByDate[]) => {
  if (!transactions) {
    return []
  }

  // Sort transactions by datePublished descending
  const sorted = [...transactions].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  )

  // Group by date
  const grouped: TransactionsByDate[] = []

  for (const transaction of sorted) {
    const {datePublishedFormatted, datePublished} = transaction
    const dateOrToday = isToday(datePublished)
      ? 'Vandaag'
      : datePublishedFormatted
    const section = grouped.find(s => s.date === dateOrToday)

    if (section) {
      section.data.push(transaction)
    } else {
      grouped.push({date: dateOrToday, data: [transaction]})
    }
  }

  return grouped
}

const transactionsIsBudget = (
  _transactions: Transactions,
  type: TransactionType,
): _transactions is BudgetTransaction[] => type === TransactionType.budget

export const mapTransactions = (
  transactions: Transactions,
  type: TransactionType,
) => {
  if (transactionsIsBudget(transactions, type)) {
    return transactions.map(transaction => ({
      id: transaction.id,
      accessibilityLabel: `${transaction.title}: ${transaction.amountFormatted}`,
      amountFormatted: transaction.amountFormatted,
      datePublished: transaction.datePublished,
      datePublishedFormatted: transaction.datePublishedFormatted,
      title: transaction.title,
    }))
  } else {
    return transactions.map(transaction => ({
      id: transaction.id,
      accessibilityLabel: `${transaction.description ?? ''}, ${transaction.discountTitle ?? ''}, ${transaction.title ?? ''}, ${transaction.discountAmountFormatted} bespaard.`,
      amountFormatted: transaction.discountAmountFormatted,
      datePublished: transaction.datePublished,
      datePublishedFormatted: transaction.datePublishedFormatted,
      description: transaction.discountTitle,
      title: transaction.description,
      provider: transaction.title,
    }))
  }
}
