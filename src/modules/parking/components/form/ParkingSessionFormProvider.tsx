import {ReactNode, useRef} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import type {ParkingLicensePlateBase} from '@/modules/parking/types'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingSessionContext} from '@/modules/parking/hooks/useParkingSession'
import {ParkingSession} from '@/modules/parking/types'
import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'

type Props = {
  children: ReactNode
  defaultValues?: {
    licensePlate?: ParkingLicensePlateBase
    startTime?: string
  }
} & (
  | {extendVisitorSession: true; parkingSession: ParkingSession}
  | {extendVisitorSession?: false; parkingSession?: ParkingSession}
)

const getDefaultValues = ({
  licensePlate,
  startTime,
  extendVisitorSession,
  parkingSession,
}: Omit<Props, 'children' | 'defaultValues'> & Props['defaultValues']) => {
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
      ps_right_id: parkingSession.ps_right_id,
      report_code: parkingSession.report_code,
    }
  }

  return {
    licensePlate,
    startTime: dayjs(startTime).isAfter(dayjs()) ? dayjs(startTime) : dayjs(),
  }
}

export type ParkingSessionFormValues = ReturnType<typeof getDefaultValues>

export const ParkingSessionFormProvider = ({
  children,
  defaultValues,
  parkingSession,
  extendVisitorSession = false,
}: Props) => {
  const {started_at} = useCurrentParkingPermit()

  const isNotYetActivePermit = dayjs(started_at).isAfter(
    dayjs(defaultValues?.startTime),
  )

  const form = useForm<ParkingSessionFormValues>({
    defaultValues: getDefaultValues({
      startTime: isNotYetActivePermit
        ? String(started_at)
        : defaultValues?.startTime,
      licensePlate: defaultValues?.licensePlate,
      parkingSession,
      extendVisitorSession,
    }),
  })
  const startTimeRef = useRef<Dayjs | null>(null)
  const userHasEditedStart = useRef(false)

  return (
    <FormProvider {...form}>
      <ParkingSessionContext.Provider
        value={{startTimeRef, userHasEditedStart}}>
        {children}
      </ParkingSessionContext.Provider>
    </FormProvider>
  )
}
