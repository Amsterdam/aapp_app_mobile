import {
  Feature,
  Polygon,
  type GeoJsonProperties,
  type MultiPolygon,
} from 'geojson'
import {Geojson} from 'react-native-maps'

export const Polygons = <P extends GeoJsonProperties>({
  data,
  onPress,
}: {
  data: Feature<Polygon | MultiPolygon, P>[]
  onPress?: (id: Feature<Polygon | MultiPolygon, P>['id']) => void
}) => (
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
