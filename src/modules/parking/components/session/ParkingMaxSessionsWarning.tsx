import {useFormContext} from 'react-hook-form'
import {AlertNegative} from '@/components/ui/feedback/alert/AlertNegative'
import {alerts} from '@/modules/parking/alerts'

export const ParkingMaxSessionsWarning = () => {
  const {
    formState: {errors},
  } = useFormContext()

  return (
    errors.root?.serverError?.message === 'SSP_MAX_SESSIONS_REACHED' ||
    (errors?.root?.serverError?.message === 'SSP_OVERBOOKED_TIME_SLOT' && (
      <AlertNegative {...alerts.maximumSessionsWarning} />
    ))
  )
}
