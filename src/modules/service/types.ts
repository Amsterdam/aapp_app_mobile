import type {EmptyObject} from '@/types/utils'
import type {Feature} from 'geojson'
import type {LatLng} from 'react-native-maps'

export enum ServiceEndpointName {
  service = 'service',
  serviceOverview = 'serviceOverview',
}

export type Service = {
  /**
   * Svg path data
   */
  icon: string
  id: string
  title: string
}

export type ServiceOverviewResponse = Service[]

type FeatureGeometry = {coordinates: [number, number]; type: 'Point'}
type FeatureProperties = {
  /**
   * Title of service point
   */
  aapp_title: string
} & Record<string, string | number | null>

export type ServiceFeature = Omit<
  Feature<FeatureGeometry, FeatureProperties>,
  'id'
> & {id: string}

export type ServiceGeoJSON = {
  features: Array<ServiceFeature>
  type: 'FeatureCollection'
}

export type ServiceMapResponseFilter<
  K extends keyof FeatureProperties = keyof FeatureProperties,
> = {
  filter_key: K
  filter_value: FeatureProperties[K]
  label: string
}

export type ServiceMapResponse = {
  data: ServiceGeoJSON | EmptyObject
  /**
   * @todo verify and refine
   */
  filters: ServiceMapResponseFilter[]
  /**
   * @todo verify and refine
   */
  list_property: {key: string; type: string}
  /**
   * These are used to match against the specific service feature properties to determine which properties are shown in bottom sheet details list
   */
  properties_to_include: {
    icon: string | null
    label: string | null
    property_key: ServiceDetailPropertyKey
    property_type: ServiceDetailPropertyType
  }[]
}

export enum ServiceDetailPropertyType {
  image = 'image',
  price = 'price',
  string = 'string',
}

export enum ServiceDetailPropertyKey {
  Prijs_per_gebruik = 'Prijs_per_gebruik',
  aapp_days_open = 'aapp_days_open',
  aapp_description = 'aapp_description',
  aapp_image_url = 'aapp_image_url',
  aapp_is_accessible = 'aapp_is_accessible',
  aapp_is_toilet = 'aapp_is_toilet',
  aapp_opening_hours = 'aapp_opening_hours',
}
export type ServicePointDetails = {
  aapp_title: string
  coordinates: LatLng
  id: string
} & Record<string, unknown>

export type ServiceFeatureProperty = {
  icon: string | null
  label: string | null
  type: ServiceDetailPropertyType
  value: string | number | null
}
