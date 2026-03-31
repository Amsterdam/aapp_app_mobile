import type {ServiceGeoJSON} from '@/modules/service/types'

export const zwembaden: ServiceGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      id: '1',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.9980818, 52.3140358],
      },
      properties: {
        aapp_title: 'test1',
        Stadsdeelcode: 'T',
        Stadsdeel: 'Zuidoost',
        Oppervlakte_m2: 19966826,
      },
    },
    {
      id: '2',
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [4.8781004, 52.3783994],
      },
      properties: {
        aapp_title: 'test2',
        Stadsdeelcode: 'A',
        Stadsdeel: 'Centrum',
        Oppervlakte_m2: 8012860,
      },
    },
  ],
}
