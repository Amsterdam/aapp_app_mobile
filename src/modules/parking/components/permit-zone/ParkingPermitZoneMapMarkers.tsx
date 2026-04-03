import {memo, useEffect, useMemo, useRef} from 'react'
import {Platform} from 'react-native'
import type {ParkingMachine} from '@/modules/parking/types'
import {setMapSelection} from '@/components/features/map/MapSelectionContext'
import {
  Clusterer,
  type ClustererProps,
} from '@/components/features/map/clusters/Clusterer'
import {
  MapMarkerVariants,
  MapMarkerVariant,
} from '@/components/features/map/marker/MapMarkerVariants'
import {Marker} from '@/components/features/map/marker/Marker'
import {getMarkerVariant} from '@/components/features/map/utils/getMarkerVariant'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'
import {useParkingMachinesQuery} from '@/modules/parking/service'

enum MarkerZIndex {
  cluster,
  filteredMarker,
}

export const ParkingPermitZoneMapMarkers = memo(() => {
  const {parking_machine_favorite} = useCurrentParkingPermit()
  const {onSelectParkingMachine, selectedParkingMachineId, region} =
    usePermitMapContext()

  const {data: parkingMachines} = useParkingMachinesQuery()

  const onSelectRef = useRef(onSelectParkingMachine)

  onSelectRef.current = onSelectParkingMachine

  const [favoriteMachine, data] = useMemo(() => {
    let favorite: ParkingMachine | undefined
    const features: ClustererProps['data'] = []

    for (const machine of parkingMachines ?? []) {
      const {lon, lat, id} = machine

      if (id === parking_machine_favorite) {
        favorite = machine
        continue
      }

      features.push({
        type: 'Feature',
        properties: {
          id,
          variant: MapMarkerVariant.pin,
          onMarkerPress: () => onSelectRef.current(id),
        },
        geometry: {type: 'Point', coordinates: [lon, lat]},
      })
    }

    return [favorite, features]
  }, [parkingMachines, parking_machine_favorite])

  const favoriteVariant = getMarkerVariant(
    selectedParkingMachineId,
    parking_machine_favorite,
  )

  useEffect(() => {
    setMapSelection(selectedParkingMachineId)

    return () => setMapSelection(undefined)
  }, [selectedParkingMachineId])

  return (
    <>
      <Clusterer
        data={data}
        region={region}
        zIndex={MarkerZIndex.cluster}
      />

      {!!favoriteMachine && (
        <Marker
          coordinate={{
            latitude: favoriteMachine.lat,
            longitude: favoriteMachine.lon,
          }}
          key={favoriteMachine.id}
          onPress={() => onSelectParkingMachine(favoriteMachine.id)}
          onSelect={() => onSelectParkingMachine(favoriteMachine.id)}
          tracksViewChanges={Platform.OS === 'android'}
          zIndex={MarkerZIndex.filteredMarker}>
          {MapMarkerVariants[favoriteVariant(favoriteMachine.id)]}
        </Marker>
      )}
    </>
  )
})
