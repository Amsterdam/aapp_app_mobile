import {createContext, type ReactNode, useContext, useMemo} from 'react'
import type {
  LicensePlatesEndpointResponse,
  ParkingLicensePlate,
  ParkingPermit,
} from '@/modules/parking/types'
import {licensePlatesMock} from '@/modules/parking/mocks/licensePlates.mock'
import {permitMock} from '@/modules/parking/mocks/permit.mock'

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
  currentPermit?: ParkingPermit
  isLoadingLicensePlates?: boolean
  licensePlates?: LicensePlatesEndpointResponse
  mutationOverrides?: LicensePlateMutationOverrides
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

  return currentPermit ?? permitMock
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
