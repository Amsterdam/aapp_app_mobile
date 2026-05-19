import {useMemo, useState} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {SearchField} from '@/components/ui/forms/SearchField'
import {Column} from '@/components/ui/layout/Column'
import {useDeviceContext} from '@/hooks/useDeviceContext'

import {ParkingMachineSearchResults} from '@/modules/parking/components/permit-zone/ParkingMachineSearchResults'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'
import {useParkingMachinesQuery} from '@/modules/parking/service'

export const ParkingMachineSearch = () => {
  const {isLandscape, isTablet} = useDeviceContext()
  const [searchTerm, setSearchTerm] = useState('')
  const {onSelectParkingMachine} = usePermitMapContext()

  const {
    data: parkingMachinesData,
    isLoading: isLoadingParkingMachinesData,
    isError: isErrorParkingMachinesData,
  } = useParkingMachinesQuery()

  const filteredParkingMachines = useMemo(() => {
    if (searchTerm && parkingMachinesData) {
      return parkingMachinesData.filter(machine =>
        machine.id.startsWith(searchTerm),
      )
    }

    return []
  }, [parkingMachinesData, searchTerm])

  if (isLoadingParkingMachinesData) {
    return <PleaseWait testID="ParkingMachineSearchPleaseWait" />
  }

  if (!parkingMachinesData?.length || isErrorParkingMachinesData) {
    return (
      <SomethingWentWrong testID="ParkingMachineSearchSomethingWentWrong" />
    )
  }

  return (
    <Box
      grow
      insetHorizontal="md"
      insetVertical={isLandscape && !isTablet ? 'no' : 'md'}>
      <Column
        flex={1}
        gutter="lg">
        <SearchField
          accessibilityLabel="Zoek een parkeerautomaat"
          autoComplete="off"
          autoCorrect={false}
          autoFocus
          keyboardType="number-pad"
          onChangeText={text => setSearchTerm(text.replaceAll(/\D/g, ''))}
          placeholder="Nummer parkeerautomaat"
          testID="ParkingMachineSearchTextSearchField"
          value={searchTerm}
        />
        <ParkingMachineSearchResults
          isSearching={!!searchTerm.length}
          onSelectParkingMachine={onSelectParkingMachine}
          parkingMachinesData={filteredParkingMachines}
        />
      </Column>
    </Box>
  )
}
