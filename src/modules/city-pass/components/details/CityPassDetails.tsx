import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {BudgetBalanceButton} from '@/modules/city-pass/components/BudgetBalanceButton'
import {ShowCityPassButton} from '@/modules/city-pass/components/ShowCityPassButton'
import {CityPassDetailsBlockedAlert} from '@/modules/city-pass/components/details/CityPassDetailsBlockedAlert'
import {CityPassDetailsInfo} from '@/modules/city-pass/components/details/CityPassDetailsInfo'
import {CityPassDetailsName} from '@/modules/city-pass/components/details/CityPassDetailsName'
import {DiscountTransactions} from '@/modules/city-pass/components/transactions/DiscountTransactions'
import {SOMETHING_WENT_WRONG_TEXT} from '@/modules/city-pass/constants'
import {useGetCityPassesQuery} from '@/modules/city-pass/service'
import {CityPass} from '@/modules/city-pass/types'

type Props = {
  passNumber: CityPass['passNumber']
}

export const CityPassDetails = ({passNumber}: Props) => {
  const {
    data: cityPasses,
    isLoading,
    isError,
    startedTimeStamp,
  } = useGetCityPassesQuery()

  const cityPass = cityPasses?.find(cp => cp.passNumber === passNumber)
  const cityPassIndex = cityPasses?.findIndex(
    cp => cp.passNumber === passNumber,
  )

  if (isLoading) {
    return (
      <Box grow>
        <Column gutter="md">
          <PleaseWait
            startedTimeStamp={startedTimeStamp}
            testID="CityPassDashboardPleaseWait"
          />
          <ShowCityPassButton index={cityPassIndex} />
        </Column>
      </Box>
    )
  }

  return (
    <Box grow>
      <Column gutter="lg">
        {!!cityPass && <CityPassDetailsName cityPass={cityPass} />}
        <ShowCityPassButton index={cityPassIndex} />
        {!cityPass || isError ? (
          <SomethingWentWrong
            testID="CityPassDetailsSomethingWentWrong"
            text={SOMETHING_WENT_WRONG_TEXT}
            title=""
          />
        ) : (
          <Column gutter="xl">
            <Column gutter="lg">
              <CityPassDetailsInfo cityPass={cityPass} />
              {cityPass.actief === false && <CityPassDetailsBlockedAlert />}
              {cityPass.budgets?.map(budget => (
                <BudgetBalanceButton
                  budget={budget}
                  key={budget.code}
                  passNumber={passNumber}
                />
              ))}
            </Column>
            <DiscountTransactions
              dateEnd={cityPass.dateEnd}
              isActive={cityPass.actief}
              passNumber={passNumber}
            />
          </Column>
        )}
      </Column>
    </Box>
  )
}
