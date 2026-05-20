import {SeverityLevel} from '@microsoft/applicationinsights-web'
import {
  selectAccessToken,
  selectAccessTokenExpiration,
  selectParkingAccount,
} from '@/modules/parking/slice'
import {refreshAccessToken} from '@/modules/parking/utils/refreshAccessToken'
import {ExceptionLogKey} from '@/processes/logging/types'
import {getAllowedData} from '@/processes/logging/utils/getAllowedData'
import {appInsights} from '@/providers/appinsights.provider'
import {PrepareHeaders} from '@/services/types'
import {type RootState} from '@/store/types/rootState'
import {dayjs} from '@/utils/datetime/dayjs'

export const prepareHeaders: PrepareHeaders = async (
  headers,
  {dispatch, getState},
) => {
  const state = getState() as RootState
  const accessTokenExpiration = dayjs(selectAccessTokenExpiration(state)) // if accessTokenExpiration is not found in the store, it will be set to now
  const account = selectParkingAccount(state)

  if (!account) {
    trackMissingAccessTokenHeader('No account.')

    return headers
  }

  let accessToken = selectAccessToken(state)
  const nowPlusMinute = dayjs().add(1, 'minute')

  if (accessTokenExpiration.isBefore(nowPlusMinute)) {
    const newAccessToken = await refreshAccessToken(
      account.reportCode,
      account.scope,
      dispatch,
      state,
    )

    accessToken = newAccessToken
  }

  if (accessToken) {
    headers.set('SSP-Access-Token', accessToken)
  } else {
    trackMissingAccessTokenHeader('No access token.')
  }

  return headers
}

const trackMissingAccessTokenHeader = (error: string) => {
  appInsights.trackException({
    exception: new Error(ExceptionLogKey.parkingAccessTokenHeader),
    severityLevel: SeverityLevel.Error,
    properties: {
      ...getAllowedData(ExceptionLogKey.parkingAccessTokenHeader, {
        error,
      }),
      fileName: 'parking/utils/prepareHeaders.ts',
    },
  })
}
