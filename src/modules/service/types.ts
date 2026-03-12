import {FeatureCollection, type Feature} from 'geojson'
import type {EmptyObject} from '@/types/utils'
import type {LatLng} from 'react-native-maps'

export enum ServiceEndpointName {
  serviceMap = 'serviceMap',
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

/**
 * @todo verify and refine
 */
type FeaturePropertiesToilet = {
  Prijs_per_gebruik: number
  aapp_days_open: null
  aapp_description: string
  aapp_image_url: string
  aapp_is_accessible: boolean
  aapp_is_toilet: boolean
  aapp_opening_hours: string
  aapp_title: string
}

/**
 * @todo verify and refine
 */
type FeaturePropertiesWater = {
  aapp_addres: null | {
    bagId: string
    city: string
    coordinates: [number, number]
    number: string
    postcode: string
    street: string
  }
  aapp_title: string
  type: string
}

type FeatureProperties = FeaturePropertiesToilet | FeaturePropertiesWater

type FeatureGeometry = {coordinates: [number, number]; type: 'Point'}

export type ServiceFeature = Feature<FeatureGeometry, FeatureProperties>

export type ServiceMapResponse = {
  data: FeatureCollection<FeatureGeometry, FeatureProperties> | EmptyObject
  /**
   * @todo verify and refine
   */
  filters: {
    filter_key: string
    filter_value: number | string | boolean
    label: string
  }[]
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
