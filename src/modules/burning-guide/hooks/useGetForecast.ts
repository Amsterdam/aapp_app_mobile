import {skipToken} from '@reduxjs/toolkit/query'
import {useBurningGuideQuery} from '@/modules/burning-guide/service'
import {getForecast} from '@/modules/burning-guide/utils/getForecast'
import {dayjs} from '@/utils/datetime/dayjs'

export const useGetForecast = (zipCode?: string) => {
  const {data, error, isError, isLoading} = useBurningGuideQuery(
    zipCode ?? skipToken,
  )

  const forecast = getForecast(dayjs(), data)

  return {error, forecast, isError, isLoading: isLoading}
}
