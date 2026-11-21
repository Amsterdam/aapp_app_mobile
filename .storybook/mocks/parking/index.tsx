import {createContext, type ReactNode, useContext, useMemo} from 'react'
import {licensePlatesMock} from '@/modules/parking/mocks/licensePlates.mock'
import {permitMock} from '@/modules/parking/mocks/permit.mock'
import type {
  LicensePlatesEndpointResponse,
  ParkingLicensePlate,
  ParkingPermit,
  ParkingPermitScope,
  ParkingSession,
  VisitorParkingSession,
} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

type LicensePlateMutationOverrides = {
  deleteLicensePlate?: (
    licensePlate: ParkingLicensePlate,
  ) => Promise<void> | void
  editLicensePlate?: ({
    id,
    vehicle_id,
    visitor_name,
  }: {
    id: ParkingLicensePlate['id']
    vehicle_id: ParkingLicensePlate['vehicle_id']
    visitor_name: NonNullable<ParkingLicensePlate['visitor_name']>
  }) => Promise<void> | void
  isErrorAddLicensePlate?: boolean
  isErrorEditLicensePlate?: boolean
  isErrorRemoveLicensePlate?: boolean
  isLoadingAddLicensePlate?: boolean
  isLoadingEditLicensePlate?: boolean
  isLoadingRemoveLicensePlate?: boolean
  saveLicensePlate?: ({
    vehicle_id,
    visitor_name,
  }: {
    vehicle_id: ParkingLicensePlate['vehicle_id']
    visitor_name: NonNullable<ParkingLicensePlate['visitor_name']>
  }) => Promise<void> | void
}

export type ParkingStorybookParameters = {
  accountScope?: ParkingPermitScope
  currentPermit?: ParkingPermit
  isLoadingLicensePlates?: boolean
  licensePlates?: LicensePlatesEndpointResponse
  mutationOverrides?: LicensePlateMutationOverrides
  parkingSessions?: ParkingSession[]
  visitorParkingSessions?: VisitorParkingSession[]
  visitorVehicleId?: string
}

const ParkingStorybookContext = createContext<ParkingStorybookParameters>({})

const resolvedPromise = Promise.resolve(undefined)

type Props = {
  children: ReactNode
  parameters?: ParkingStorybookParameters
}

export const ParkingStorybookProvider = ({children, parameters}: Props) => {
  const storybookParameters = useMemo(() => parameters ?? {}, [parameters])

  return (
    <ParkingStorybookContext.Provider value={storybookParameters}>
      {children}
    </ParkingStorybookContext.Provider>
  )
}

const useParkingStorybookParameters = () => useContext(ParkingStorybookContext)

export const useCurrentParkingPermit = () => {
  const {currentPermit} = useParkingStorybookParameters()
  const permit = currentPermit ?? permitMock

  const isPermitStartedAtInFuture =
    permit.max_session_length_in_days === 1 &&
    !!permit.started_at &&
    dayjs(permit.started_at).isAfter(dayjs().add(1, 'day'), 'day')

  return {...permit, isPermitStartedAtInFuture}
}

export const useGetLicensePlates = () => {
  const {isLoadingLicensePlates, licensePlates} =
    useParkingStorybookParameters()

  return {
    isLoading: isLoadingLicensePlates ?? false,
    licensePlates: licensePlates ?? licensePlatesMock,
  }
}

export const useLicensePlateMutations = () => {
  const {mutationOverrides} = useParkingStorybookParameters()

  return {
    deleteLicensePlate:
      mutationOverrides?.deleteLicensePlate ?? (() => resolvedPromise),
    editLicensePlate:
      mutationOverrides?.editLicensePlate ?? (() => resolvedPromise),
    isErrorAddLicensePlate: mutationOverrides?.isErrorAddLicensePlate ?? false,
    isErrorEditLicensePlate:
      mutationOverrides?.isErrorEditLicensePlate ?? false,
    isErrorRemoveLicensePlate:
      mutationOverrides?.isErrorRemoveLicensePlate ?? false,
    isLoadingAddLicensePlate:
      mutationOverrides?.isLoadingAddLicensePlate ?? false,
    isLoadingEditLicensePlate:
      mutationOverrides?.isLoadingEditLicensePlate ?? false,
    isLoadingRemoveLicensePlate:
      mutationOverrides?.isLoadingRemoveLicensePlate ?? false,
    saveLicensePlate:
      mutationOverrides?.saveLicensePlate ??
      (({
        vehicle_id: _vehicle_id,
        visitor_name: _visitor_name,
      }: {
        vehicle_id: ParkingLicensePlate['vehicle_id']
        visitor_name: NonNullable<ParkingLicensePlate['visitor_name']>
      }) => resolvedPromise),
  }
}
