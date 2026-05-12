import {IApplicationInsights} from '@microsoft/applicationinsights-web'
import type {PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk'
import {RootStackParams} from '@/app/navigation/types'
import {Params} from '@/processes/logging/hooks/useTrackEvents'
import {ExceptionLogKey, TrackException} from '@/processes/logging/types'
import {PiwikCategory, Piwik, PiwikDimension} from '@/processes/piwik/types'
import {createCustomDimensionsFromRouteParams} from '@/processes/piwik/utils/createCustomDimensionsFromRouteParams'
import {getCustomDimensions} from '@/processes/piwik/utils/getCustomDimensions'
import {getTitleFromParams} from '@/processes/piwik/utils/getTitleFromParams'
import {sanitizeUrl} from '@/utils/sanitizeUrl'

const FILENAME = 'useTrackEvents.ts'

export const getTrackEvents = (
  trackException: TrackException,
  suggestedCategory: PiwikCategory,
  appInsights: IApplicationInsights,
  piwikInstance?: PiwikProSdkType | null,
  routeName?: keyof RootStackParams,
  params?: Params,
): Piwik => ({
  ready: !!piwikInstance,
  trackCustomEvent: (
    name,
    action,
    dimensions,
    category = suggestedCategory,
    value = undefined,
  ) => {
    if (piwikInstance) {
      piwikInstance
        .trackCustomEvent(category, action, {
          path: routeName,
          customDimensions: getCustomDimensions(dimensions),
          value,
          name,
        })
        .catch(() => {
          trackException(ExceptionLogKey.piwikTrackCustomEvent, FILENAME, {
            category,
            action,
            name,
            routeName,
            value,
          })
        })
    }

    appInsights.trackEvent({
      name: action,
      properties: {
        ...getCustomDimensions(dimensions, true),
        value,
        name,
        routeName,
        category,
      },
    })
  },
  trackOutlink: (rawUrl, options) => {
    const url = sanitizeUrl(rawUrl)

    if (piwikInstance) {
      piwikInstance
        .trackOutlink(url, {
          ...options,
          customDimensions: getCustomDimensions({
            ...options?.customDimensions,
            [PiwikDimension.routeName]: routeName,
          }),
        })
        .catch(() => {
          trackException(ExceptionLogKey.piwikTrackOutlink, FILENAME, {
            url,
          })
        })
    }

    appInsights.trackEvent({
      name: 'outlink',
      properties: {
        ...getCustomDimensions(options?.customDimensions, true),
        url,
        routeName,
        category: suggestedCategory,
      },
    })
  },
  trackScreen: path => {
    const name = path ?? routeName

    if (!name) {
      return
    }

    const {
      appInsights: customDimensionsAppInsights,
      piwik: customDimensionsPiwik,
    } = createCustomDimensionsFromRouteParams(params)

    if (piwikInstance) {
      piwikInstance
        .trackScreen(name, {
          title: getTitleFromParams(params),
          customDimensions: customDimensionsPiwik as {
            [index: number]: string
          },
        })
        .catch(() => {
          trackException(ExceptionLogKey.piwikTrackScreen, FILENAME, {
            path,
          })
        })
    }

    appInsights.trackPageView(
      {name},
      {
        ...customDimensionsAppInsights,
        title: getTitleFromParams(params),
      },
    )
  },
  trackSearch: (keyword, options) => {
    if (piwikInstance) {
      piwikInstance
        .trackSearch(keyword, {
          ...options,
          customDimensions: getCustomDimensions(options?.customDimensions),
        })
        .catch(() => {
          trackException(ExceptionLogKey.piwikTrackSearch, FILENAME)
        })
    }

    appInsights.trackEvent({
      name: 'search',
      properties: {
        ...getCustomDimensions(options?.customDimensions, true),
        keyword,
        routeName,
        category: suggestedCategory,
      },
    })
  },
})
