import {useMemo, useRef, type PropsWithChildren, type ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import MapView, {type MapViewProps, type Region} from 'react-native-maps'
import type {ControlVariant} from '@/components/features/map/types'
import type {ModuleSlug} from '@/modules/slugs'
import type {Theme} from '@/themes/themes'
import {MapContext} from '@/components/features/map/MapContext'
import {MapControls} from '@/components/features/map/MapControls'
import {AMSTERDAM_REGION} from '@/components/features/map/constants'
import {useInitializeMap} from '@/components/features/map/hooks/useInitializeMap'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {AlertInline} from '@/components/ui/feedback/alert/AlertInline'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useThemable} from '@/themes/useThemable'

type Props = PropsWithChildren<{
  FilterComponent?: ReactNode
  controls?: ControlVariant[]
  focusOnUser?: boolean
  isError?: boolean
  moduleSlug: ModuleSlug
}> &
  MapViewProps

export const MapBase = ({
  children,
  controls,
  FilterComponent,
  isError,
  moduleSlug,
  focusOnUser = true,
  ...mapViewProps
}: Props) => {
  const mapRef = useRef<MapView>(null)
  const regionRef = useRef<Region>(null)
  const styles = useThemable(createStyles)

  const {isMapReady, ...initialize} = useInitializeMap(focusOnUser, mapRef)

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
        {(!!controls?.length || !!isError || !!FilterComponent) && (
          <View
            pointerEvents="box-none"
            style={styles.overlay}>
            <Column gutter="md">
              <Row
                align="between"
                valign="start"
                vgutter="md"
                wrap>
                {!!FilterComponent && FilterComponent}
                {!!controls?.length && (
                  <View
                    pointerEvents="auto"
                    style={styles.controls}>
                    <MapControls
                      moduleSlug={moduleSlug}
                      variants={controls}
                    />
                  </View>
                )}
              </Row>
              {!!isError && (
                <View
                  pointerEvents="auto"
                  style={styles.error}>
                  <AlertInline
                    hasCloseIcon
                    inset="no"
                    testID="MapBaseSomethingWentWrong"
                    text="Probeer het later nog eens."
                    title="De gegevens kunnen niet worden geladen"
                    variant={AlertVariant.negative}
                  />
                </View>
              )}
            </Column>
          </View>
        )}
        <MapView
          collapsable={false}
          initialRegion={AMSTERDAM_REGION}
          moveOnMarkerPress={false}
          onRegionChangeComplete={(regionData, details) => {
            regionRef.current = regionData
            mapViewProps.onRegionChangeComplete?.(regionData, details)
          }}
          provider="google"
          ref={mapRef}
          showsBuildings={false}
          showsMyLocationButton={false}
          showsUserLocation={isMapReady} // Workaround for Android to show user location after map is ready
          style={styles.mapView}
          userInterfaceStyle="light"
          {...mapViewProps}
          {...initialize}>
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
      marginLeft: 'auto',
      marginRight: size.spacing.md,
    },
    error: {paddingHorizontal: size.spacing.md},
    mapView: {
      flex: 1,
    },
    overlay: {
      width: '100%',
      position: 'absolute',
      paddingVertical: size.spacing.smd,
      zIndex: 1,
    },
  })
