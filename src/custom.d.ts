/* eslint-disable import-x/no-default-export */
declare module '*.svg' {
  import {FC} from 'react'
  import {SvgProps} from '@/types/svg'

  const content: FC<SvgProps>
  export default content
}

declare module '*.jpg' {
  import {ImageURISource} from 'react-native'

  const source: ImageURISource
  export default source
}

declare module '*.png' {
  import {ImageURISource} from 'react-native'

  const content: ImageURISource
  export default content
}

declare module '@env' {
  export const API_KEY_DEV: string | undefined
  export const API_KEY_TEST: string | undefined
  export const API_KEY_ACC: string | undefined
  export const API_KEY_PROD: string | undefined
  export const BUILD_NUMBER: string | undefined
  export const PIWIK_PRO_ID: string | undefined
  export const PIWIK_PRO_ID_ACCEPT: string | undefined
  export const PIWIK_PRO_URL: string | undefined
  export const PIWIK_PRO_URL_ACCEPT: string | undefined
  export const VERSION: string | undefined
  export const APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV: string | undefined
  export const APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_TEST: string | undefined
  export const APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_ACC: string | undefined
  export const APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_PROD: string | undefined
  export const CHAT_DEVELOPER_NAME_DEV: string | undefined
  export const CHAT_ORGANIZATION_ID_DEV: string | undefined
  export const CHAT_URL_DEV: string | undefined
  export const CHAT_DEVELOPER_NAME_TEST: string | undefined
  export const CHAT_ORGANIZATION_ID_TEST: string | undefined
  export const CHAT_URL_TEST: string | undefined
  export const CHAT_DEVELOPER_NAME_ACC: string | undefined
  export const CHAT_ORGANIZATION_ID_ACC: string | undefined
  export const CHAT_URL_ACC: string | undefined
  export const CHAT_DEVELOPER_NAME_PROD: string | undefined
  export const CHAT_ORGANIZATION_ID_PROD: string | undefined
  export const CHAT_URL_PROD: string | undefined
  export const WASTE_CONTAINER_SERVICE_PRINCIPAL_NAME: string | undefined
  export const WASTE_CONTAINER_SERVICE_PRINCIPAL_SECRET: string | undefined
  export const WASTE_CONTAINER_ORGANISATION_ID: string | undefined
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
