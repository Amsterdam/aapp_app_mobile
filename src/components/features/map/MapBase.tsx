import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import MapView, {MapViewProps, type Region} from 'react-native-maps'
import type {ModuleSlug} from '@/modules/slugs'
import {MapContext} from '@/components/features/map/MapContext'
import {MapControls} from '@/components/features/map/MapControls'
import {
  AMSTERDAM_REGION,
  ANIMATION_DURATION,
} from '@/components/features/map/constants'
import {ControlVariant} from '@/components/features/map/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = PropsWithChildren<{
  controls?: ControlVariant[]
  moduleSlug?: ModuleSlug
}> &
  MapViewProps

export const MapBase = ({
  children,
  controls,
  initialRegion,
  moduleSlug,
  ...mapViewProps
}: Props) => {
  const [isMapReady, setIsMapReady] = useState(false)
  const mapRef = useRef<MapView>(null)
  const regionRef = useRef<Region>(null)
  const styles = useThemable(createStyles)

  const handleOnMapReady = () => {
    setIsMapReady(true)
  }

  useEffect(() => {
    if (!isMapReady) {
      return
    }

    if (initialRegion) {
      mapRef.current?.animateToRegion(initialRegion, ANIMATION_DURATION)
    } else {
      mapRef.current?.animateToRegion(AMSTERDAM_REGION, ANIMATION_DURATION)
    }
  }, [isMapReady, initialRegion, mapRef])

  const context = useMemo(
    () => ({
      map: mapRef,
      getCurrentRegion: () => regionRef.current,
    }),
    [],
  )

  return (
    <MapContext.Provider value={context}>
      <View style={styles.container}>
        {!!controls?.length && !!moduleSlug && (
          <View style={styles.controls}>
            <MapControls
              moduleSlug={moduleSlug}
              variants={controls}
            />
          </View>
        )}
        <MapView
          collapsable={false}
          initialRegion={AMSTERDAM_REGION} // Default initial region is overview of Amsterdam.
          moveOnMarkerPress={false}
          onMapReady={handleOnMapReady}
          onRegionChangeComplete={(regionData, details) => {
            regionRef.current = regionData
            mapViewProps.onRegionChangeComplete?.(regionData, details)
          }}
          provider={Platform.OS === 'android' ? 'google' : undefined}
          ref={mapRef}
          showsBuildings={false}
          showsMyLocationButton={false}
          showsUserLocation={isMapReady} // Workaround for Android to show user location after map is ready
          style={styles.mapView}
          userInterfaceStyle="light"
          {...mapViewProps}>
          {children}
        </MapView>
      </View>
    </MapContext.Provider>
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    controls: {
      position: 'absolute',
      top: size.spacing.md,
      right: size.spacing.md,
      zIndex: 1,
    },
    mapView: {
      flex: 1,
    },
  })
