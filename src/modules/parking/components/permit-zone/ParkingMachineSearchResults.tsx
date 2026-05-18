import {useMemo} from 'react'
import {FlatList} from 'react-native'
import {EmptyList} from '@/components/features/EmptyList'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ParkingMachineFavoriteButton} from '@/modules/parking/components/permit-zone/ParkingMachineFavoriteButton'
import {ParkingMachineListItem} from '@/modules/parking/components/permit-zone/ParkingMachineListItem'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {type ParkingMachine} from '@/modules/parking/types'
import {ModuleSlug} from '@/modules/slugs'
import {layoutStyles} from '@/styles/layoutStyles'
import {sortByDistanceToAddress} from '@/utils/sortByDistanceToAddress'

type Props = {
  isSearching: boolean
  onSelectParkingMachine: (id: ParkingMachine['id']) => void
  parkingMachinesData: ParkingMachine[]
}

const ParkingMachineSearchResultsEmptyList = ({
  onSelectParkingMachine,
  isSearching,
}: Omit<Props, 'parkingMachinesData'>) => {
  const currentParkingPermit = useCurrentParkingPermit()

  if (currentParkingPermit.parking_machine_favorite) {
    return <ParkingMachineFavoriteButton onPress={onSelectParkingMachine} />
  }

  if (!isSearching) {
    return null
  }

  return <EmptyList testID="ParkingMachineSearchResultsEmptyList" />
}

export const ParkingMachineSearchResults = ({
  isSearching,
  onSelectParkingMachine,
  parkingMachinesData,
}: Props) => {
  const {address} = useSelectedAddress(ModuleSlug.parking)

  const parkingMachinesByDistance = useMemo(
    () => sortByDistanceToAddress(parkingMachinesData || [], address),
    [parkingMachinesData, address],
  )

  return (
    <FlatList
      contentContainerStyle={layoutStyles.grow}
      data={parkingMachinesByDistance}
      ListEmptyComponent={
        <ParkingMachineSearchResultsEmptyList
          isSearching={isSearching}
          onSelectParkingMachine={onSelectParkingMachine}
        />
      }
      renderItem={({item: parkingMachine}) => (
        <ParkingMachineListItem
          onPress={onSelectParkingMachine}
          parkingMachine={parkingMachine}
          showIcon
        />
      )}
      style={layoutStyles.grow}
    />
  )
}
