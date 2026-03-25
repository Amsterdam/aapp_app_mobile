import {useCallback, useContext, useMemo, useState, type ReactNode} from 'react'
import type {Region} from 'react-native-maps'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'
import {PermitMapContext} from '@/modules/parking/providers/PermitMap.context'
import {type ParkingMachine} from '@/modules/parking/types'

export const PermitMapProvider = ({children}: {children: ReactNode}) => {
  const [selectedMachineId, setSelectedMachineId] = useState<
    ParkingMachine['id'] | undefined
  >(undefined)
  const [region, setRegion] = useState<Region | undefined>()

  const {open} = useContext(BottomSheetContext)

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

  const value = useMemo(
    () => ({
      region,
      setRegion: changeRegion,
      onSelectParkingMachine,
      resetSelectedParkingMachineId,
      selectedParkingMachineId: selectedMachineId,
    }),
    [
      selectedMachineId,
      resetSelectedParkingMachineId,
      onSelectParkingMachine,
      changeRegion,
      region,
    ],
  )

  return (
    <PermitMapContext.Provider value={value}>
      {children}
    </PermitMapContext.Provider>
  )
}
