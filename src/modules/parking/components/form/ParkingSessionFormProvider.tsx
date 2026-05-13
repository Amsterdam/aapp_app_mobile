import {ReactNode} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {ParkingSession} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  children: ReactNode
  defaultStartTime?: string
} & (
  | {extendVisitorSession: true; parkingSession: ParkingSession}
  | {extendVisitorSession?: false; parkingSession?: ParkingSession}
)

const getDefaultValues = ({
  defaultStartTime,
  extendVisitorSession,
  parkingSession,
}: Omit<Props, 'children'>) => {
  if (extendVisitorSession && parkingSession) {
    return {
      licensePlate: {
        vehicle_id: parkingSession.vehicle_id,
        visitor_name: parkingSession.visitor_name,
      },
      startTime: dayjs(parkingSession.end_date_time),
      originalStartTime: dayjs(parkingSession.start_date_time),
      endTime: dayjs(parkingSession.end_date_time),
      originalEndTime: dayjs(parkingSession.end_date_time),
      parking_machine: parkingSession.parking_machine,
      paymentZoneId: parkingSession.payment_zone_id,
      ps_right_id: parkingSession.ps_right_id,
      report_code: parkingSession.report_code,
    }
  }

  if (parkingSession) {
    return {
      licensePlate: {
        vehicle_id: parkingSession.vehicle_id,
        visitor_name: parkingSession.visitor_name,
      },
      startTime: dayjs(parkingSession.start_date_time),
      originalStartTime: dayjs(parkingSession.start_date_time),
      endTime: dayjs(parkingSession.end_date_time),
      originalEndTime: dayjs(parkingSession.end_date_time),
      parking_machine: parkingSession.parking_machine,
      paymentZoneId: parkingSession.payment_zone_id,
      ps_right_id: parkingSession.ps_right_id,
      report_code: parkingSession.report_code,
    }
  }

  return {
    startTime: dayjs(defaultStartTime).isAfter(dayjs())
      ? dayjs(defaultStartTime)
      : dayjs(),
  }
}

export type ParkingSessionFormValues = ReturnType<typeof getDefaultValues>

export const ParkingSessionFormProvider = ({
  children,
  defaultStartTime,
  parkingSession,
  extendVisitorSession = false,
}: Props) => {
  const form = useForm<ParkingSessionFormValues>({
    defaultValues: getDefaultValues({
      defaultStartTime,
      parkingSession,
      extendVisitorSession,
    }),
  })

  return <FormProvider {...form}>{children}</FormProvider>
}
