/* eslint-disable react-refresh/only-export-components */
import {
  APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV,
  APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_TEST,
  APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_ACC,
  APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_PROD,
} from '@env'
import {ReactNativePlugin} from '@microsoft/applicationinsights-react-native'
import {ApplicationInsights, Snippet} from '@microsoft/applicationinsights-web'
import {createContext, ReactNode, use} from 'react'
import {Platform} from 'react-native'
import {getStartupTimeSync} from 'react-native-device-info'
import {Environment, EnvUrlMap} from '@/environment'
import {isProductionApp} from '@/processes/development'
import {EventLogKey} from '@/processes/logging/types'

const environmentInstrumentationKey: EnvUrlMap = {
  [Environment.custom]: APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV ?? '',
  [Environment.development]: APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_DEV ?? '',
  [Environment.test]: APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_TEST ?? '',
  [Environment.acceptance]: APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_ACC ?? '',
  [Environment.production]: APPLICATION_INSIGHTS_INSTRUMENTATION_KEY_PROD ?? '',
}

export const getApplicationInsightsConfig = (
  environment: Environment,
): Snippet => ({
  config: {
    instrumentationKey:
      environmentInstrumentationKey[environment] ??
      environmentInstrumentationKey[Environment.production],
    extensions: [RNPlugin],
    excludeRequestFromAutoTrackingPatterns: [
      /https:\/\/clients3\.google\.com\/generate_204\?.*/,
      /https:\/\/js\.monitor\.azure\.com\/.*/,
      /http:\/\/[^/a-z]+\/(index\.bundle\/\/?)?symbolicate/,
    ],
  },
})

const RNPlugin = new ReactNativePlugin()

export const appInsights = new ApplicationInsights(
  getApplicationInsightsConfig(
    isProductionApp ? Environment.production : Environment.development,
  ),
)

appInsights.addDependencyInitializer(
  initializer => initializer.item.responseCode !== 0,
)

appInsights.loadAppInsights()

/**
 * Threshold of 3 minutes to prevent useless logging:
 * Found in the code of Sentry:
 * According to a talk at WWDC about optimizing app launch
 * (https://devstreaming-cdn.apple.com/videos/wwdc/2019/423lzf3qsjedrzivc7/423/423_optimizing_app_launch.pdf?dl=1
 * slide 17) no process exists for cold and warm launches. Since iOS 15, though, the system
 * might decide to pre-warm your app before the user tries to open it.
 * Prewarming can stop at any of the app launch steps. Our findings show that most of
 * the prewarmed app starts don't call the main method. Therefore we subtract the
 * time before the module initialization / main method to calculate the app start
 * duration. If the app start stopped during a later launch step, we drop it below with
 * checking the SENTRY_APP_START_MAX_DURATION. With this approach, we will
 * lose some warm app starts, but we accept this tradeoff. Useful resources:
 * https://developer.apple.com/documentation/uikit/app_and_environment/responding_to_the_launch_of_your_app/about_the_app_launch_sequence#3894431
 * https://developer.apple.com/documentation/metrickit/mxapplaunchmetric,
 * https://twitter.com/steipete/status/1466013492180312068,
 * https://github.com/MobileNativeFoundation/discussions/discussions/146
 * https://eisel.me/startup
 */
export const APP_START_MAX_DURATION_IOS = 180000

if (
  !__DEV__ &&
  (Platform.OS !== 'ios' ||
    new Date().getTime() - Number(getStartupTimeSync()) <
      APP_START_MAX_DURATION_IOS)
) {
  appInsights.trackMetric({
    name: EventLogKey.nativeStartup,
    average: new Date().getTime() - Number(getStartupTimeSync()),
  })
}

export const AppInsightsContext = createContext(appInsights)

type Props = {
  children: ReactNode
}

export const AppInsightsProvider = ({children}: Props) => (
  <AppInsightsContext value={appInsights}>{children}</AppInsightsContext>
)

export const useAppInsights = () => use(AppInsightsContext)
