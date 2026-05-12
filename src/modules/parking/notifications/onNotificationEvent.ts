import type {ModuleClientConfig} from '@/modules/types'
import {tagTypes} from '@/modules/parking/constants'
import {parkingApi} from '@/modules/parking/service'
import {
  setCurrentAccountByPermitReportCode,
  setCurrentPermitReportCode,
} from '@/modules/parking/slice'

export const onNotificationEvent: ModuleClientConfig<{
  reportCode?: string
}>['onNotificationEvent'] = (notification, dispatch) => {
  const reportCode = notification?.data?.reportCode

  dispatch(setCurrentPermitReportCode(reportCode))
  dispatch(setCurrentAccountByPermitReportCode(reportCode))
  dispatch(parkingApi.util.invalidateTags([...tagTypes]))
}
