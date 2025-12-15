import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {AlertNegative} from '@/components/ui/feedback/alert/AlertNegative'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useRefetchInterval} from '@/hooks/useRefetchInterval'
import {alerts} from '@/modules/parking/alerts'
import {ParkingChooseAmountButton} from '@/modules/parking/components/form/ParkingChooseAmountButton'
import {ParkingReceiptItem} from '@/modules/parking/components/form/ParkingReceiptItem'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetRemainingBalance} from '@/modules/parking/hooks/useGetRemainingBalance'
import {
  useAccountDetailsQuery,
  useSessionReceiptQuery,
} from '@/modules/parking/service'
import {useParkingAccount} from '@/modules/parking/slice'
import {
  ParkingApiVersion,
  ParkingLicensePlate,
  ParkingPermitScope,
} from '@/modules/parking/types'
import {getDateForCostCalculation} from '@/modules/parking/utils/getDateForCostCalculation'
import {useBottomSheetSelectors} from '@/store/slices/bottomSheet'
import {dayjs, Dayjs} from '@/utils/datetime/dayjs'
import {formatSecondsTimeRangeToDisplay} from '@/utils/datetime/formatSecondsTimeRangeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

const ROOT_LOCAL_ERROR_KEY = 'root.localError'

export const ParkingReceipt = () => {
  const {
    clearErrors,
    setError,
    setValue,
    watch,
    formState: {errors},
  } = useFormContext<{
    amount?: number
    endTime?: Dayjs
    licensePlate?: ParkingLicensePlate
    originalEndTime?: Dayjs
    parking_machine?: string
    paymentZoneId?: string
    ps_right_id?: number
    startTime: Dayjs
    visitorVehicleId?: string
  }>()
  const {
    endTime,
    originalEndTime,
    licensePlate,
    parking_machine,
    paymentZoneId,
    ps_right_id,
    amount = 0,
    visitorVehicleId,
    startTime,
  } = watch()

  const apiVersion = useCurrentParkingApiVersion()
  const vehicleId = licensePlate?.vehicle_id ?? visitorVehicleId ?? '111111'
  const parkingAccount = useParkingAccount()
  const isPermitHolder =
    parkingAccount?.scope === ParkingPermitScope.permitHolder
  const isVisitor = parkingAccount?.scope === ParkingPermitScope.visitor

  const currentPermit = useCurrentParkingPermit()
  const {isOpen} = useBottomSheetSelectors()
  const nowRounded = dayjs().set('second', 0)
  const {isEndTimeBeforeOriginal, calculatedEndTime, calculatedStartTime} =
    getDateForCostCalculation({
      endTime,
      originalEndTime,
      startTime,
      now: nowRounded,
    })

  const isAllDataEntered =
    !!endTime &&
    !!calculatedEndTime &&
    !!calculatedStartTime &&
    (parking_machine || !currentPermit.can_select_zone) &&
    endTime?.isAfter(startTime)

  const queryParams =
    isAllDataEntered && !isOpen
      ? {
          report_code: currentPermit.report_code.toString(),
          end_date_time: calculatedEndTime?.toJSON(),
          parking_machine,
          payment_zone_id: paymentZoneId,
          start_date_time: calculatedStartTime?.toJSON(),
          vehicle_id: vehicleId,
          ps_right_id,
        }
      : skipToken

  const {data, isLoading} = useSessionReceiptQuery(queryParams)

  const {isLoading: isLoadingAccount, data: accountData} =
    useAccountDetailsQuery()

  const checkStartTime = useCallback(() => {
    const now = dayjs().set('second', 0)

    if (!originalEndTime && now.isAfter(startTime)) {
      setValue('startTime', now)
    }
  }, [originalEndTime, setValue, startTime])

  useEffect(() => {
    checkStartTime()
  }, [endTime, checkStartTime])

  useRefetchInterval(checkStartTime, 5000)

  const {remainingTimeBalance, remainingWalletBalance} = useGetRemainingBalance(
    nowRounded,
    endTime,
    originalEndTime,
    parking_machine,
    paymentZoneId,
    isEndTimeBeforeOriginal && data?.costs?.value
      ? -data?.costs?.value
      : data?.costs?.value,
  )

  const {parking_time, parking_cost} = data ?? {}
  const possiblyNegativePrefix = isEndTimeBeforeOriginal ? '-' : ''
  const parkingTimeText = parking_time
    ? `${possiblyNegativePrefix}${formatSecondsTimeRangeToDisplay(
        parking_time,
        {
          short: true,
        },
      )}`
    : '-'
  const parkingCostText = parking_cost
    ? `${possiblyNegativePrefix}${formatNumber(data?.costs?.value, data?.costs.currency)}`
    : '-'

  const remainingTimeBalanceText = formatSecondsTimeRangeToDisplay(
    remainingTimeBalance,
    {
      short: true,
    },
  )

  const remainingWalletBalanceText =
    typeof remainingWalletBalance === 'number'
      ? formatNumber(remainingWalletBalance, 'EUR')
      : 'Onbekend'

  const remainingTimeBalanceError =
    currentPermit.time_balance_applicable &&
    remainingTimeBalance &&
    remainingTimeBalance < 0

  const remainingWalletBalanceError =
    isPermitHolder &&
    currentPermit.money_balance_applicable &&
    typeof remainingWalletBalance === 'number' &&
    accountData?.wallet?.balance !== 0 &&
    remainingWalletBalance < 0

  useEffect(() => {
    if (remainingTimeBalanceError) {
      setError(ROOT_LOCAL_ERROR_KEY, {
        type: 'isTimeBalanceInsufficient',
      })
    } else if (errors.root?.localError?.type === 'isTimeBalanceInsufficient') {
      clearErrors(ROOT_LOCAL_ERROR_KEY)
    }
  }, [
    clearErrors,
    errors.root?.localError?.type,
    remainingTimeBalanceError,
    setError,
  ])

  useEffect(() => {
    if (remainingWalletBalanceError) {
      setError(ROOT_LOCAL_ERROR_KEY, {
        type: 'isWalletBalanceInsufficient',
      })
    } else if (
      errors.root?.localError?.type === 'isWalletBalanceInsufficient'
    ) {
      clearErrors(ROOT_LOCAL_ERROR_KEY)
    }
  }, [
    clearErrors,
    errors.root?.localError?.type,
    remainingWalletBalanceError,
    setError,
  ])

  useEffect(() => {
    if (isVisitor) {
      setValue('amount', data?.costs?.value)
    }
  }, [isVisitor, data?.costs?.value, setValue])

  if (isLoading || isLoadingAccount) {
    return <PleaseWait testID="ParkingSessionReceiptPleaseWait" />
  }

  if (
    !currentPermit.time_balance_applicable &&
    !currentPermit.money_balance_applicable
  ) {
    return null
  }

  return (
    <Column gutter="lg">
      <Column gutter="md">
        {(!!remainingWalletBalanceError || (amount > 0 && isPermitHolder)) &&
          apiVersion === ParkingApiVersion.v1 && (
            <>
              <Title
                level="h2"
                testID="ParkingIncreaseBalanceTitle"
                text="Geldsaldo toevoegen"
              />
              <ParkingChooseAmountButton />
              <Gutter height="sm" />
            </>
          )}
        <Title
          level="h2"
          testID="ParkingCostTitle"
          text="Kosten"
        />
        <Column gutter="xs">
          {!!currentPermit.time_balance_applicable && (
            <ParkingReceiptItem>
              <Phrase emphasis="strong">Parkeertijd</Phrase>
              <Phrase emphasis="strong">{parkingTimeText}</Phrase>
            </ParkingReceiptItem>
          )}
          {!!currentPermit.money_balance_applicable && (
            <ParkingReceiptItem>
              <Phrase emphasis="strong">Parkeerkosten</Phrase>
              <Phrase emphasis="strong">{parkingCostText}</Phrase>
            </ParkingReceiptItem>
          )}
        </Column>
        <Column gutter="xs">
          {!!currentPermit.time_balance_applicable && (
            <ParkingReceiptItem>
              <Phrase color={remainingTimeBalanceError ? 'warning' : undefined}>
                Resterend tijdsaldo
              </Phrase>
              <Phrase color={remainingTimeBalanceError ? 'warning' : undefined}>
                {remainingTimeBalanceText}
              </Phrase>
            </ParkingReceiptItem>
          )}

          {!!currentPermit.money_balance_applicable && !!isPermitHolder && (
            <ParkingReceiptItem>
              <Phrase
                color={remainingWalletBalanceError ? 'warning' : undefined}>
                Resterend geldsaldo
              </Phrase>
              <Phrase
                color={remainingWalletBalanceError ? 'warning' : undefined}>
                {remainingWalletBalanceText}
              </Phrase>
            </ParkingReceiptItem>
          )}
        </Column>
      </Column>
      {(!!remainingTimeBalanceError ||
        errors.root?.serverError?.message ===
          'SSP_TIME_BALANCE_INSUFFICIENT') && (
        <AlertNegative
          {...alerts[
            isPermitHolder
              ? 'insufficientTimeBalanceFailed'
              : 'insufficientTimeBalanceVisitorFailed'
          ]}
        />
      )}
      {(!!remainingWalletBalanceError ||
        errors.root?.serverError?.message === 'SSP_BALANCE_TOO_LOW') && (
        <AlertNegative
          {...(apiVersion === ParkingApiVersion.v1
            ? alerts.insufficientMoneyBalanceFailed
            : alerts.insufficientMoneyBalance2Failed)}
        />
      )}
      {errors.root?.serverError &&
        errors.root?.serverError?.message !== 'SSP_TIME_BALANCE_INSUFFICIENT' &&
        errors.root?.serverError?.message !== 'SSP_BALANCE_TOO_LOW' && (
          <SomethingWentWrong testID="ParkingReceiptSomethingWentWrong" />
        )}
    </Column>
  )
}
