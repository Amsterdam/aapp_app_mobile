import {formatSecondsTimeRangeToDisplay} from '@/utils/datetime/formatSecondsTimeRangeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

export const getReceiptTexts = ({
  isEndTimeBeforeOriginal,
  parking_cost,
  parking_time,
  costs,
  remainingTimeBalance,
  remainingWalletBalance,
}: {
  costs?: {currency: string; value: number}
  isEndTimeBeforeOriginal: boolean
  parking_cost?: {
    currency: string
    value: number
  }
  parking_time?: number
  remainingTimeBalance?: number
  remainingWalletBalance?: number
}) => {
  const possiblyNegativePrefix = isEndTimeBeforeOriginal ? '-' : ''
  const parkingTimeText = parking_time
    ? `${possiblyNegativePrefix}${formatSecondsTimeRangeToDisplay(
        parking_time,
        {
          format: 'short',
        },
      )}`
    : '-'
  const parkingCostText = parking_cost
    ? `${possiblyNegativePrefix}${formatNumber(costs?.value, costs?.currency)}`
    : '-'

  const remainingTimeBalanceText = formatSecondsTimeRangeToDisplay(
    remainingTimeBalance,
    {
      format: 'short',
    },
  )

  const remainingWalletBalanceText =
    typeof remainingWalletBalance === 'number'
      ? formatNumber(remainingWalletBalance, 'EUR')
      : 'Onbekend'

  return {
    remainingTimeBalanceText,
    remainingWalletBalanceText,
    parkingCostText,
    parkingTimeText,
  }
}
