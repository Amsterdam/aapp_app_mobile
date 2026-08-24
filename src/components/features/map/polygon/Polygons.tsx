import {Geojson} from 'react-native-maps'
import type {Feature, Polygon, GeoJsonProperties, MultiPolygon} from 'geojson'

type Props<P extends GeoJsonProperties> = {
  data: Feature<Polygon | MultiPolygon, P>[]
  onPress?: (id: Feature<Polygon | MultiPolygon, P>['id']) => void
}
export const Polygons = <P extends GeoJsonProperties>({
  data,
  onPress,
}: Props<P>) => (
  <Geojson
    geojson={{type: 'FeatureCollection', features: data}}
    onPress={e => {
      if (e.feature.id !== undefined) {
        onPress?.(e.feature.id)
      }
    }}
    tappable={!!onPress}
  />
)
