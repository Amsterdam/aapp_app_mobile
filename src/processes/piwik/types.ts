import {
  CommonEventOptions,
  TrackScreenOptions,
} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {AccessibilityChangeEventName} from 'react-native'
import {ModuleSlug} from '@/modules/slugs'

export type Piwik = {
  ready: boolean
  trackCustomEvent: (
    name: string,
    action: PiwikAction,
    dimensions?: CustomDimensions,
    category?: PiwikCategory,
    value?: number,
  ) => void
  trackOutlink: (
    url: string,
    options?: ReplaceCustomDimensions<CommonEventOptions>,
  ) => void
  trackScreen: (path?: ScreenOutsideNavigationName) => void
  trackSearch: (
    keyword: string,
    options?: ReplaceCustomDimensions<TrackScreenOptions>,
  ) => void
}

/**
 * Custom dimensions; these should be configured in the Piwik system.
 */
export enum PiwikDimension {
  /** Zoekterm gebruikt in zoekmachine */
  searchTerm = 3,
  /** Aantal zoekresultaten */
  searchResultAmount = 4,
  /** Soort zoekopdracht */
  searchType = 5,
  /** Title van het aangeklikte zoekresultaat */
  searchResultTitle = 6,
  /** URL van het aangeklikte zoekresultaat */
  searchResultUrl = 7,
  /** Soort van het aangeklikte zoekresultaat */
  searchResultType = 8,
  /** Het hoeveelste zoekresultaat is aangeklikt (telt van boven) */
  searchResultSelected = 9,
  /** Titel van het content bericht */
  contentTitle = 10,
  /** Onderwerp/Onderwerpen van het content bericht */
  contentSubject = 11,
  /** Team dat het content bericht heeft geschreven */
  contentTeam = 12,
  /** Laatste publicatiedatum van het content bericht */
  contentPublicationDate = 13,
  /** Type van de content (artikel/nieuws) */
  contentType = 14,
  /** Gebruikers filter op intern of extern */
  userIntext = 15,
  /** Zoekmachine soort */
  searchMachine = 16,
  /** Pagina type o.b.v. Amsterdam Content Meetmodel */
  pageType = 17,
  /** The ID related to the content e.g. a project ID */
  contentId = 20,
  /** The new state of the element. e.g. open or closed for an accordion */
  newState = 36,
  /** The route of an url. e.g. route of external link */
  routeName = 43,
  /** The title of a push-notification */
  pushTitle = 44,
  /** The content of a push-notification */
  pushContent = 45,
  /** Whether app is entered with push-notification deeplink */
  isPushNotificationDeeplink = 47,
}

/**
 * Custom session dimensions; these should be configured in the Piwik system.
 */
export enum PiwikSessionDimension {
  /** Gebruikerstype (al gebruikt door mijn.amsterdam als ProfileType) */
  userType = 1,
  /** Gebruikersstad (al gebruikt door mijn.amsterdam als City) */
  userCity = 2,
  // app version
  appVersion = 18,
  appVersionWithBuild = 19,
  // a11y
  reduceMotionEnabled = 21,
  screenReaderEnabled = 22,
  accessibilityServiceEnabled = 23,
  boldTextEnabled = 24,
  grayscaleEnabled = 25,
  invertColorsEnabled = 26,
  reduceTransparencyEnabled = 27,
  // device info
  fontScale = 28,
  isLandscape = 29,
  isPortrait = 30,
  isTablet = 31,
  // permissions
  hasCameraPermission = 32,
  hasPhotosPermission = 33,
  hasLocationPermission = 34,
  hasNotificationPermission = 35,
  hasBiometricsPermission = 48,
  // modules
  contactModule = 37,
  redirectsModule = 38,
  wasteGuideModule = 39,
  reportProblemModule = 40,
  constructionWorkModule = 41,
  constructionWorkEditorModule = 42,
  cityPassModule = 46,
  parkingModule = 49,
}

export type CustomDimensionKeys = PiwikDimension | PiwikSessionDimension

export type CustomDimensions = Partial<Record<CustomDimensionKeys, string>>

export type ReplaceCustomDimensions<T> = Omit<T, 'customDimensions'> & {
  customDimensions?: CustomDimensions
}

/** Log categories, we use this to distinguish between modules. Non-module related data should be logged in the "general" category. */
export type PiwikCategory = ModuleSlug | 'general'

/** The actions that can trigger a log. */
export enum PiwikAction {
  accessibilityAction = 'accessibilityAction',
  accessibilityChange = 'accessibilityChange',
  blur = 'blur',
  buttonPress = 'buttonPress',
  deviceInfoChange = 'deviceInfoChange',
  finishedReport = 'finishedReport',
  locationOrAddressSelectionChange = 'locationOrAddressSelectionChange',
  moduleChange = 'moduleChange',
  pushNotificationDisplay = 'pushNotificationDisplay',
  radioChange = 'radioChange',
  startUp = 'startUp',
  toForeground = 'toForeground',
  toggle = 'toggle',
}

/** We generally use the route name as the name of the screen when we log a screen view. This is not possible for screens outside the navigation tree, for those we use these names. */
export enum ScreenOutsideNavigationName {
  errorWithRestart = 'errorWithRestart',
  updateScreen = 'updateScreen',
}

export enum PiwikError {
  alreadyInitialized = 'Piwik Pro SDK has been already initialized',
  missingEnvVars = 'PIWIK_PRO_URL or PIWIK_PRO_ID are not defined in env',
}

export type LogProps = {
  logAction?: PiwikAction
  logCategory?: PiwikCategory
  /**
   * Custom dimensions to log with the event.
   */
  logDimensions?: CustomDimensions
  logName?: string
  logValue?: number
}

export type AccessibilityFeatureLogConfig = {
  dimension: PiwikSessionDimension
  eventName: AccessibilityChangeEventName
  getIsEnabled: () => Promise<boolean>
}
