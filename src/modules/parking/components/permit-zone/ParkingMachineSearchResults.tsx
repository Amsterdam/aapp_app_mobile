import {useMemo} from 'react'
import {FlatList} from 'react-native'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ParkingMachineFavoriteButton} from '@/modules/parking/components/permit-zone/ParkingMachineFavoriteButton'
import {ParkingMachineListItem} from '@/modules/parking/components/permit-zone/ParkingMachineListItem'
import {type ParkingMachine} from '@/modules/parking/types'
import {ModuleSlug} from '@/modules/slugs'
import {sortByDistanceToAddress} from '@/utils/sortByDistanceToAddress'

export const ParkingMachineSearchResults = ({
  onSelectParkingMachine,
  parkingMachinesData,
}: {
  onSelectParkingMachine: (id: ParkingMachine['id']) => void
  parkingMachinesData: ParkingMachine[]
}) => {
  const {address} = useSelectedAddress(ModuleSlug.parking)

  const parkingMachinesByDistance = useMemo(
    () => sortByDistanceToAddress(parkingMachinesData || [], address),
    [parkingMachinesData, address],
  )

  return (
    <FlatList
      data={parkingMachinesByDistance}
      ListEmptyComponent={
        <ParkingMachineFavoriteButton onPress={onSelectParkingMachine} />
      }
      renderItem={({item: parkingMachine}) => (
        <ParkingMachineListItem
          onPress={onSelectParkingMachine}
          parkingMachine={parkingMachine}
          showIcon
        />
      )}
    />
  )
}
