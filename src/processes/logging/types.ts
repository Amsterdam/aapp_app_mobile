import {AllowListKeys} from '@/processes/logging/allowList'

export enum EventLogKey {
  fullStartup = 'Full startup',
  internetConnection = 'Internet connection changed',
  nativeStartup = 'Native startup',
}
export enum ExceptionLogKey {
  chatCreateConversationClient = 'Chat create conversation client failed',
  chatPickImageFromLibrary = 'Chat pick image from library failed',
  chatPickPDF = 'Chat pick PDF document failed',
  chatRetrieveRemoteConfiguration = 'Chat retrieve remote configuration failed',
  chatSendImageFromCamera = 'Chat send image from camera failed',
  chatSendImageFromLibrary = 'Chat send image from library failed',
  chatSendMessage = 'Chat send message failed',
  chatSendPDF = 'Chat send PDF document failed',
  chatSendReply = 'Chat send reply failed',
  chatSendTypingEvent = 'Chat send typing event failed',
  chatSubmitRemoteConfiguration = 'Chat submit remote configuration failed',
  chatTakeImageWithCamera = 'Chat take image with camera failed',
  coordinates = 'Failed to get coordinates to determine location',
  deepLink = 'Deep link returns failed state',
  getRedirectsUrl = 'Get redirects url with key',
  hideSplashScreen = 'Hide splash screen failed',
  isScreenReaderEnabled = 'Screenreader enabled check failed',
  mapPressCluster = 'Map press cluster failed',
  nodeNotFound = 'Node not found for ref',
  notSupportedStoredUrl = 'Can not use url to open store',
  openMailUrl = 'Open mail url failed',
  openPhoneUrl = 'Open phone url failed',
  openStore = 'Open app store',
  openWebUrl = 'Open web url failed',
  parkingAccessTokenHeader = 'Failed to set parking access token header',
  parkingLoginFailed = 'Parking login failed',
  pickingImageFailed = 'Picking image from device failed',
  piwikInitialization = 'Piwik initialization failed',
  piwikTrackCustomEvent = 'Piwik trackCustomEvent failed',
  piwikTrackOutlink = 'Piwik trackOutlink failed',
  piwikTrackScreen = 'Piwik trackScreen failed',
  piwikTrackSearch = 'Piwik trackSearch failed',
  redirectNotFound = 'Redirect not found',
  registerDevice = 'Register device for push notifications failed',
  requestLocationPermission = 'Request location permission failed',
  resetLoginsAfterInvalidAccessCode = 'Reset logins after invalid access code failed',
  shareFailed = 'Failed to share url',
  surveySubmissionFailed = 'Survey submission failed',
  svgProps = 'The provided svg props are not valid',
  takingPhotoFailed = 'Taking photo failed',
  tokenInvalid = 'Access token invalid',
  updatePermission = 'Update permission failed',
}

export const enum SeverityLevel {
  Verbose = 0,
  Information = 1,
  Warning = 2,
  Error = 3,
  Critical = 4,
}

export type TrackException = <T extends ExceptionLogKey>(
  logKey: T,
  filename: string,
  data?: AllowListKeys<T> extends never
    ? never
    : Partial<Record<AllowListKeys<T>, unknown>>,
  /**
   * @default `SeverityLevel.Error`
   */
  severityLevel?: SeverityLevel,
) => void
