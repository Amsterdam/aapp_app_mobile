import type {EmptyObject} from '@/types/utils'
import type {Feature} from 'geojson'
import type {LatLng} from 'react-native-maps'

export enum ServiceEndpointName {
  service = 'service',
  serviceOverview = 'serviceOverview',
}

export type ServiceItem = {
  /**
   * Svg path data
   */
  icon: string
  id: string
  title: string
}

export type ServiceOverviewResponse = ServiceItem[]

type FeatureGeometry = {coordinates: [number, number]; type: 'Point'}
type FeatureProperties = {
  Prijs_per_gebruik: number
  aapp_days_open: null | string
  aapp_description: string
  aapp_image_url: string
  aapp_is_accessible: boolean
  aapp_is_toilet: boolean
  aapp_opening_hours: string
  aapp_title: string
}

export type ServiceFeature = Omit<Feature<FeatureGeometry>, 'id'> & {
  id: string
  properties: FeatureProperties
}

export type ServiceGeoJSON = {
  features: Array<ServiceFeature>
  type: 'FeatureCollection'
}

export type ServiceMapResponseFilter = {
  filter_key: keyof FeatureProperties
  filter_value: number | string | boolean
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
    property_key: string
    property_type: ServiceDetailPropertyType
  }[]
}

export enum ServiceDetailPropertyType {
  image = 'image',
  price = 'price',
  string = 'string',
}

export type ServicePointDetails = {
  aapp_title: string
  coordinates: LatLng
  id: string
} & Record<string, unknown>
