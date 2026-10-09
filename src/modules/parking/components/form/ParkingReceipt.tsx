import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ParkingReceiptErrors} from '@/modules/parking/components/form/ParkingReceiptErrors'
import {ParkingReceiptItem} from '@/modules/parking/components/form/ParkingReceiptItem'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetRemainingBalance} from '@/modules/parking/hooks/useGetRemainingBalance'
import {useRemainingTimeBalanceError} from '@/modules/parking/hooks/useRemainingTimeBalanceError'
import {useRemainingWalletBalanceError} from '@/modules/parking/hooks/useRemainingWalletBalanceError'
import {useSessionReceiptQuery} from '@/modules/parking/service'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingLicensePlate, ParkingPermitScope} from '@/modules/parking/types'
import {getDateForCostCalculation} from '@/modules/parking/utils/getDateForCostCalculation'
import {getReceiptTexts} from '@/modules/parking/utils/getReceiptTexts'
import {Dayjs} from '@/utils/datetime/dayjs'

export const ParkingReceipt = () => {
  const parkingAccount = useParkingAccount()
  const currentPermit = useCurrentParkingPermit()
  const {isOpen} = useBottomSheet()

  const {
    setValue,
    watch,
    formState: {errors},
  } = useFormContext<{
    amount?: number
    endTime?: Dayjs
    licensePlate?: ParkingLicensePlate
    originalEndTime?: Dayjs
    parking_machine?: string
    ps_right_id?: number
    startTime: Dayjs
    visitorVehicleId?: string
  }>()

  const {
    endTime,
    originalEndTime,
    licensePlate,
    parking_machine,
    ps_right_id,
    visitorVehicleId,
    startTime,
  } = watch()

  const {isEndTimeBeforeOriginal, calculatedEndTime, calculatedStartTime} =
    getDateForCostCalculation({
      endTime,
      originalEndTime,
      startTime,
    })

  const isAllDataEntered =
    !!endTime &&
    !!calculatedEndTime &&
    !!calculatedStartTime &&
    (parking_machine || !currentPermit.can_select_zone) &&
    endTime?.isAfter(startTime)

  const {data, isLoading} = useSessionReceiptQuery(
    isAllDataEntered && !isOpen
      ? {
          report_code: currentPermit.report_code.toString(),
          end_date_time: calculatedEndTime?.toJSON(),
          parking_machine,
          start_date_time: calculatedStartTime?.toJSON(),
          vehicle_id: licensePlate?.vehicle_id ?? visitorVehicleId ?? '111111',
          ps_right_id,
        }
      : skipToken,
  )

  const cost =
    isEndTimeBeforeOriginal && data?.costs.value
      ? -data?.costs.value
      : data?.costs.value

  const {remainingTimeBalance, remainingWalletBalance} = useGetRemainingBalance(
    startTime,
    endTime,
    originalEndTime,
    parking_machine,
    cost,
  )

  const {
    parkingCostText,
    parkingTimeText,
    remainingTimeBalanceText,
    remainingWalletBalanceText,
  } = getReceiptTexts({
    ...data,
    isEndTimeBeforeOriginal,
    remainingTimeBalance,
    remainingWalletBalance,
  })

  const remainingTimeBalanceError =
    useRemainingTimeBalanceError(remainingTimeBalance)

  const remainingWalletBalanceError = useRemainingWalletBalanceError(
    remainingWalletBalance,
  )

  useEffect(() => {
    if (parkingAccount?.scope === ParkingPermitScope.visitor) {
      setValue('amount', data?.costs.value)
    }
  }, [parkingAccount, data, setValue])

  if (isLoading) {
    return (
      <PleaseWait
        showFeedback
        testID="ParkingSessionReceiptPleaseWait"
      />
    )
  }

  if (errors.root?.serverError?.message === 'SSP_BAD_REQUEST') {
    return <SomethingWentWrong testID="ParkingReceiptSomethingWentWrong" />
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
        <Title
          level="h2"
          testID="ParkingCostTitle"
          text="Kosten"
        />
        <Column gutter="xs">
          {!!currentPermit.time_balance_applicable && (
            <ParkingReceiptItem>
              <Phrase
                accessible={false}
                emphasis="strong">
                Parkeertijd
              </Phrase>
              <Phrase
                accessible={false}
                emphasis="strong">
                {parkingTimeText}
              </Phrase>
            </ParkingReceiptItem>
          )}
          {!!currentPermit.money_balance_applicable && (
            <ParkingReceiptItem>
              <Phrase
                accessible={false}
                emphasis="strong">
                Parkeerkosten
              </Phrase>
              <Phrase
                accessible={false}
                emphasis="strong">
                {parkingCostText}
              </Phrase>
            </ParkingReceiptItem>
          )}
        </Column>
        <Column gutter="xs">
          {!!currentPermit.time_balance_applicable && (
            <ParkingReceiptItem>
              <Phrase
                accessible={false}
                color={remainingTimeBalanceError ? 'negative' : undefined}>
                Resterend tijdsaldo
              </Phrase>
              <Phrase
                accessible={false}
                color={remainingTimeBalanceError ? 'negative' : undefined}>
                {remainingTimeBalanceText}
              </Phrase>
            </ParkingReceiptItem>
          )}

          {!!currentPermit.money_balance_applicable &&
            parkingAccount?.scope === ParkingPermitScope.permitHolder && (
              <ParkingReceiptItem>
                <Phrase
                  accessible={false}
                  color={remainingWalletBalanceError ? 'negative' : undefined}>
                  Resterend geldsaldo
                </Phrase>
                <Phrase
                  accessible={false}
                  color={remainingWalletBalanceError ? 'negative' : undefined}>
                  {remainingWalletBalanceText}
                </Phrase>
              </ParkingReceiptItem>
            )}
        </Column>
      </Column>
      <ParkingReceiptErrors
        remainingTimeBalanceError={remainingTimeBalanceError}
        remainingWalletBalanceError={remainingWalletBalanceError}
      />
    </Column>
  )
}
