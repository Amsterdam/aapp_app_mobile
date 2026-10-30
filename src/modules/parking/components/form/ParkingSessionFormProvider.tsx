import {ReactNode, useRef} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingSessionContext} from '@/modules/parking/hooks/useParkingSession'
import {ParkingSession} from '@/modules/parking/types'
import type {ParkingLicensePlateBase} from '@/modules/parking/types'
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

export type ParkingSessionFormValues = {
  /**
   * This value is relevant for visitor parking sessions, which requires immediate checkout after submitting start session form.  
   */
  amount?: number
  endTime?: Dayjs
  licensePlate?: ParkingLicensePlateBase
  originalEndTime?: Dayjs
  originalStartTime?: Dayjs
  parking_machine?: string
  parking_machine_favorite?: boolean
  ps_right_id?: number
  report_code?: string
  startTime: Dayjs
}

const getDefaultValues = ({
  licensePlate,
  startTime,
  extendVisitorSession,
  parkingSession,
}: Omit<Props, 'children' | 'defaultValues'> &
  Props['defaultValues']): ParkingSessionFormValues => {
  if (parkingSession) {
    return {
      licensePlate: {
        vehicle_id: parkingSession.vehicle_id,
        visitor_name: parkingSession.visitor_name,
      },
      startTime: dayjs(
        extendVisitorSession
          ? parkingSession.end_date_time
          : parkingSession.start_date_time,
      ),
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
