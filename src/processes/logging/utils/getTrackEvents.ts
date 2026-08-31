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

export enum LogTarget {
  appInsights = 'appInsights',
  both = 'both',
  piwik = 'piwik',
}

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
    logTarget: LogTarget = LogTarget.both,
  ) => {
    if (
      piwikInstance &&
      (logTarget === LogTarget.piwik || logTarget === LogTarget.both)
    ) {
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

    if (logTarget === LogTarget.appInsights || logTarget === LogTarget.both) {
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
    }
  },
  trackOutlink: (rawUrl, options, logTarget: LogTarget = LogTarget.both) => {
    const url = sanitizeUrl(rawUrl)

    if (
      piwikInstance &&
      (logTarget === LogTarget.piwik || logTarget === LogTarget.both)
    ) {
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

    if (logTarget === LogTarget.appInsights || logTarget === LogTarget.both) {
      appInsights.trackEvent({
        name: 'outlink',
        properties: {
          ...getCustomDimensions(options?.customDimensions, true),
          url,
          routeName,
          category: suggestedCategory,
        },
      })
    }
  },
  trackScreen: (path, logTarget: LogTarget = LogTarget.both) => {
    const name = path ?? routeName

    if (!name) {
      return
    }

    const {
      appInsights: customDimensionsAppInsights,
      piwik: customDimensionsPiwik,
    } = createCustomDimensionsFromRouteParams(params)

    if (
      piwikInstance &&
      (logTarget === LogTarget.piwik || logTarget === LogTarget.both)
    ) {
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

    if (logTarget === LogTarget.appInsights || logTarget === LogTarget.both) {
      appInsights.trackPageView(
        {name},
        {
          ...customDimensionsAppInsights,
          title: getTitleFromParams(params),
        },
      )
    }
  },
  trackSearch: (keyword, options, logTarget: LogTarget = LogTarget.both) => {
    if (
      piwikInstance &&
      (logTarget === LogTarget.piwik || logTarget === LogTarget.both)
    ) {
      piwikInstance
        .trackSearch(keyword, {
          ...options,
          customDimensions: getCustomDimensions(options?.customDimensions),
        })
        .catch(() => {
          trackException(ExceptionLogKey.piwikTrackSearch, FILENAME)
        })
    }

    if (logTarget === LogTarget.appInsights || logTarget === LogTarget.both) {
      appInsights.trackEvent({
        name: 'search',
        properties: {
          ...getCustomDimensions(options?.customDimensions, true),
          keyword,
          routeName,
          category: suggestedCategory,
        },
      })
    }
  },
})
