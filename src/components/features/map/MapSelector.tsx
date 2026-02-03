import {skipToken} from '@reduxjs/toolkit/query'
import {useState} from 'react'
import {View} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import type {LatLng, MapPressEvent} from 'react-native-maps'
import {MapBase} from '@/components/features/map/MapBase'
import {Marker} from '@/components/features/map/marker/Marker'
import {MarkerVariant} from '@/components/features/map/marker/markers.generated'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useGetLocationQuery} from '@/modules/address/service'

type Props = {
  mapHeight?: number
  onSelect?: (coordinate: LatLng) => void
} & TestProps

export const MapSelector = ({mapHeight, onSelect, testID}: Props) => {
  const [selected, setSelected] = useState<LatLng | null>(null)
  const styles = createStyles(mapHeight)
  const {currentData: addressList, isFetching} = useGetLocationQuery(
    selected ? {lat: selected.latitude, lon: selected.longitude} : skipToken,
  )

  const onPress = (e: MapPressEvent) => {
    setSelected(e.nativeEvent.coordinate)
    onSelect?.(e.nativeEvent.coordinate)
  }

  return (
    <Column gutter="md">
      <View style={styles.container}>
        <MapBase
          onPress={onPress}
          testID={testID}>
          {!!selected && (
            <Marker
              coordinate={selected}
              variant={MarkerVariant.selectedPin}
            />
          )}
        </MapBase>
      </View>
      <Column gutter="sm">
        {addressList?.length ? (
          <Phrase>
            <Phrase emphasis="strong">Locatie: </Phrase>
            {`${addressList[0].street} ${'number' in addressList[0] ? addressList[0].number : ''}, ${'postcode' in addressList[0] ? addressList[0].postcode : ''} ${addressList[0].city}`}
          </Phrase>
        ) : (
          isFetching && (
            <Row>
              <Icon
                color="link"
                name="spinner"
                size="lg"
              />
            </Row>
          )
        )}
      </Column>
    </Column>
  )
}

const createStyles = (height?: number) => ({
  container: {
    flex: 1,
    height: height ?? undefined,
  },
})
