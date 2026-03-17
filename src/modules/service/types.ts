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
} & Record<string, unknown>

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
