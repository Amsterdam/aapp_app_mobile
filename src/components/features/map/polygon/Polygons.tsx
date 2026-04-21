import {Geojson} from 'react-native-maps'
import type {ServicePolygonFeature} from '@/modules/service/types'

export const Polygons = ({
  data,
  onPress,
}: {
  data: ServicePolygonFeature[]
  onPress: (id: ServicePolygonFeature['id']) => void
}) => (
  <Geojson
    geojson={{type: 'FeatureCollection', features: data}}
    onPress={e => {
      if (e.feature.id !== undefined) {
        onPress(e.feature.id)
      }
    }}
    tappable={!!onPress}
  />
)
