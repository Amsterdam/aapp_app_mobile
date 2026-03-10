import {useCallback, useMemo, useState, type ReactNode} from 'react'
import type {Region} from 'react-native-maps'
import {PermitMapContext} from '@/modules/parking/providers/PermitMap.context'
import {
  type ParkingMachine,
  type ParkingPermitMapViewType,
} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const PermitMapProvider = ({
  children,
  variant,
}: {
  children: ReactNode
  variant: Exclude<ParkingPermitMapViewType, 'map'>
}) => {
  const [selectedMachineId, setSelectedMachineId] = useState<
    ParkingMachine['id'] | undefined
  >(undefined)
  const [region, setRegion] = useState<Region | undefined>()
  const [viewType, setViewType] = useState<ParkingPermitMapViewType>('map')

  const {open} = useBottomSheet()

  const onSelectParkingMachine = useCallback(
    (id: ParkingMachine['id']) => {
      setSelectedMachineId(id)
      open()
    },
    [open],
  )

  const resetSelectedParkingMachineId = useCallback(
    () => setSelectedMachineId(undefined),
    [setSelectedMachineId],
  )

  const changeRegion = useCallback((newRegion: Region) => {
    setRegion(newRegion)
  }, [])

  const toggleViewType = useCallback(() => {
    const newViewType: ParkingPermitMapViewType =
      viewType === 'map' ? variant : 'map'

    setViewType(newViewType)
  }, [setViewType, viewType, variant])

  const value = useMemo(
    () => ({
      region,
      setRegion: changeRegion,
      onSelectParkingMachine,
      resetSelectedParkingMachineId,
      selectedParkingMachineId: selectedMachineId,
      viewType,
      viewVariants: ['map', variant] as [
        'map',
        Exclude<ParkingPermitMapViewType, 'map'>,
      ],
      toggleViewType,
    }),
    [
      selectedMachineId,
      resetSelectedParkingMachineId,
      onSelectParkingMachine,
      changeRegion,
      region,
      viewType,
      variant,
      toggleViewType,
    ],
  )

  return (
    <PermitMapContext.Provider value={value}>
      {children}
    </PermitMapContext.Provider>
  )
}
