import {Geojson} from 'react-native-maps'
import type {ServiceFeature} from '@/modules/service/types'

export const Polygon = ({
  data,
  onPress,
}: {
  data: ServiceFeature[]
  onPress: (id: ServiceFeature['id']) => void
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
