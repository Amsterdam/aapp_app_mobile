import type {EmptyObject} from '@/types/utils'
import type {Feature} from 'geojson'

export enum ServiceEndpointName {
  service = 'service',
  serviceOverview = 'serviceOverview',
}

export enum ServiceModuleSource {
  kingsday = 'koningsdag',
  service = 'handig-in-de-stad',
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
   * Optional custom icon reference, used in conjunction with icons_to_include
   */
  aapp_icon_type?: string
  /**
   * Title of service point
   */
  aapp_title: string
} & Record<string, string | number | boolean | null>

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
export type ServiceMapResponseIcon = {
  circle_color: string
  path: string
  path_color: string
}

type ServiceMapResponseIcons = Record<string, ServiceMapResponseIcon>

export type ServiceMapResponse = {
  data: ServiceGeoJSON | EmptyObject
  filters: ServiceMapResponseFilter[]
  /**
   * A mapping of icons to use within custom markers
   */
  icons_to_include?: ServiceMapResponseIcons
  //TODO: change type once colors are added to layers
  layers: ServiceMapResponseFilter[]
  /**
   * These are used to match against the specific service feature properties to determine which properties are shown in the list view
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
  address = 'address',
  image = 'image',
  keyValueTable = 'key_value_table',
  malfunction = 'malfunction',
  price = 'price',
  string = 'string',
}

export type ServiceFeatureProperty = {
  icon: string | null
  label: string | null
  type: ServiceDetailPropertyType
  value: string | number | boolean | null
}
