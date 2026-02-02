import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import type {Theme} from '@/themes/themes'
import {MapBase} from '@/components/features/map/MapBase'
import {Marker} from '@/components/features/map/marker/Marker'
import {MarkerVariant} from '@/components/features/map/marker/markers.generated'
import {ControlVariant} from '@/components/features/map/types'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'
import {ModuleSlug} from '@/modules/slugs'
import {useGetActiveRecyclePoint} from '@/modules/waste-guide/hooks/useGetActiveRecyclePoint'
import {useThemable} from '@/themes/useThemable'

export const WasteGuideRecyclePointMap = () => {
  const {activeRecyclePoint: recyclePoint, isLoading} =
    useGetActiveRecyclePoint()
  const directionsUrl = useGetGoogleMapsDirectionsUrl({
    lat: recyclePoint?.address.coordinates?.lat,
    lon: recyclePoint?.address.coordinates?.lon,
  })
  const {bottom} = useSafeAreaInsets()
  const styles = useThemable(theme => createStyles(theme, bottom))

  useSetScreenTitle(recyclePoint?.name)

  if (isLoading) {
    return <PleaseWait testID="WasteGuideRecyclePointMapPleaseWait" />
  }

  const coordinates = recyclePoint?.address.coordinates

  if (!coordinates) {
    return (
      <SomethingWentWrong testID="WasteGuideRecyclePointMapSomethingWentWrong" />
    )
  }

  // Ensure lat/lon are numbers (not strings) (TODO: remove once fixed in API as requested)
  const latitude =
    typeof coordinates.lat === 'string'
      ? Number.parseFloat(coordinates.lat)
      : coordinates.lat
  const longitude =
    typeof coordinates.lon === 'string'
      ? Number.parseFloat(coordinates.lon)
      : coordinates.lon

  return (
    <View style={styles.container}>
      <MapBase
        controls={[ControlVariant.location]}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
        moduleSlug={ModuleSlug['waste-guide']}>
        <Marker
          coordinate={{latitude, longitude}}
          description={recyclePoint.address.street}
          title={recyclePoint.name}
          variant={MarkerVariant.selectedPin}
        />
      </MapBase>
      <View style={styles.routeButtonContainer}>
        <ExternalLinkButton
          label="Route openen"
          testID="WasteGuideRecyclePointMapExternalLinkButton"
          url={directionsUrl}
          variant="secondary"
        />
      </View>
    </View>
  )
}

const createStyles = ({size}: Theme, insetBottom: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    routeButtonContainer: {
      left: size.spacing.md,
      right: size.spacing.md,
      position: 'absolute',
      bottom: size.spacing.md + insetBottom,
      marginHorizontal: size.spacing.md,
      zIndex: 1,
    },
  })
