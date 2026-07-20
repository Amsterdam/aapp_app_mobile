import {
  ServiceDetailPropertyType,
  type ServiceMapResponse,
  type ServiceMapResponseIcon,
} from '@/modules/service/types'

export const ALL_TYPES_LABEL = 'Alle types'
export const ALL_DATES_LABEL = 'Alle dagen'
export const TODAY_LABEL = 'Vandaag'
export const TOMORROW_LABEL = 'Morgen'
export const THIS_WEEKEND_LABEL = 'Dit weekend'
export const CHOOSE_DATE_LABEL = 'Kies een datum'

const EVENTS_LABEL = 'Evenementen'

export const EVENTS_ID_PREFIX = 'event-location-'
export const EVENTS_FILTER_KEY = 'aapp_subtitle'
export const EVENTS_FILTER_VALUE = 'Evenementen'
export const EVENTS_ICON_LABEL = 'events'
export const EVENTS_PROPERTY_KEY = 'aapp_table_pride'

const PRIDE_EVENT_ICON_CONFIG: ServiceMapResponseIcon = {
  path: 'M10.8 16.1V9.1L21 7.4V16.7C21 18.1 19.9 19.2 18.5 19.2C17.1 19.2 16 18.1 16 16.7C16 15.3 17.1 14.2 18.5 14.2C18.8 14.2 19.1 14.3 19.3 14.4V11.1L12.5 12.2V18.4C12.5 19.8 11.4 20.9 10 20.9C8.6 20.9 7.5 19.8 7.5 18.4C7.5 17 8.6 15.9 10 15.9C10.3 15.9 10.6 16 10.8 16.1ZM5.8 10.8V4L11.3 3V6.4L7.5 7.1V13.2C7.5 14.6 6.4 15.7 5 15.7C3.6 15.7 2.5 14.6 2.5 13.2C2.5 11.8 3.6 10.7 5 10.7C5.3 10.7 5.5 10.7 5.8 10.8Z',
  circle_color: '#ec0000',
  path_color: '#ffffff',
}

export const EVENT_MAP_LAYER: ServiceMapResponse['layers'][number] = {
  label: EVENTS_LABEL,
  filter_key: EVENTS_FILTER_KEY,
  filter_value: EVENTS_FILTER_VALUE,
  icon_label: EVENTS_ICON_LABEL,
}

export const EVENT_PROPERTIES_TO_INCLUDE: ServiceMapResponse['properties_to_include'][number] =
  {
    icon: PRIDE_EVENT_ICON_CONFIG.path,
    label: EVENTS_LABEL,
    property_key: EVENTS_PROPERTY_KEY,
    property_type: ServiceDetailPropertyType.keyValueTableDivided,
  }
export const EVENT_ICONS_TO_INCLUDE: ServiceMapResponse['icons_to_include'] = {
  [EVENTS_ICON_LABEL]: PRIDE_EVENT_ICON_CONFIG,
}
