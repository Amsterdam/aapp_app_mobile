import {TurboModuleRegistry} from 'react-native'
import type {TurboModule} from 'react-native'
import type {EventEmitter} from 'react-native/Libraries/Types/CodegenTypes'

export interface Spec extends TurboModule {
  addListener: (eventName: string) => void
  checkIfInBusinessHours: () => Promise<boolean>
  createConversationClient: (conversationId: string | null) => Promise<string>
  createCoreClient: (
    url: string,
    organizationId: string,
    developerName: string,
  ) => Promise<void>
  destroyStorageAndAuthorization: () => Promise<void>
  endConversation: () => Promise<void>
  generateUUID: () => string
  markAsRead: (message: ConversationEntryBase) => Promise<boolean>
  /**
   * @type {ConnectionState}
   */
  readonly onConnectionStatusChanged: EventEmitter<string>
  readonly onError: EventEmitter<CoreError>
  /**
   * @type {NetworkState}
   */
  readonly onNetworkStatusChanged: EventEmitter<string>
  /**
   * @type {ConversationEntry}
   */
  readonly onNewMessage: EventEmitter<ConversationEntryBase>
  /**
   * @type {ConversationEntry}
   */
  readonly onTypingStarted: EventEmitter<ConversationEntryBase>
  /**
   * @type {ConversationEntry}
   */
  readonly onTypingStopped: EventEmitter<ConversationEntryBase>
  /**
   * @type {ConversationEntry}
   */
  readonly onUpdatedMessage: EventEmitter<ConversationEntryBase>
  removeListeners: (count: number) => void
  retrieveRemoteConfiguration: () => Promise<RemoteConfiguration>
  retrieveTranscript: () => Promise<RetrieveTranscriptResponse>
  sendImage: (
    imageBase64: string,
    fileName: string,
    uri: string,
    message?: string,
  ) => Promise<void>
  sendMessage: (message: string) => Promise<void>
  sendPDF: (
    filePath: string,
    fileName: string,
    message?: string,
  ) => Promise<void>
  sendReply: (choice: Choice) => Promise<void>
  sendTypingEvent: () => Promise<void>
  submitRemoteConfiguration: (
    remoteConfiguration: RemoteConfiguration,
    createConversationOnSubmit: boolean,
  ) => Promise<void>
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'SalesforceMessagingInApp',
)

export enum PreChatFieldTypes {
  checkbox = 'Checkbox',
  choiceList = 'ChoiceList',
  email = 'Email',
  number = 'Number',
  phone = 'Phone',
  text = 'Text',
  textArea = 'TextArea',
}

export type PreChatField = {
  editable: boolean
  /**
   * @deprecated Android only
   */
  errorType: string
  /**
   * @deprecated iOS only
   */
  identifier: string | undefined
  isHidden: boolean
  label?: string
  maxLength: number
  name: string
  order: number
  required: boolean
  type: PreChatFieldTypes
  value?: string
}

export type ChoiceListValue = {
  isDefaultValue: boolean
  label: string
  order: number
  valueId: string
  valueName: string
}

export type ChoiceList = {
  identifier: string
  values: ChoiceListValue[]
}

export type ValueDependency = {
  childId: string
  parentId: string
}

export type RemoteConfiguration = {
  choiceListConfiguration: {
    choiceLists: ChoiceList[]
    valueDependencies: ValueDependency[]
  }
  /**
   * @default 'Mobile'
   */
  deploymentType: string
  /**
   * @default 'GemeenteAmsterdamMessaging_pp'
   */
  name: string
  preChatConfiguration: PreChatConfiguration[]
  termsAndConditions: {
    isEnabled: boolean
    isRequired?: boolean
    label?: string
  }
  timestamp: number
}

export type PreChatConfiguration = {
  /**
   * @default 'Prechat'
   */
  formType: string
  hiddenPreChatFields: PreChatField[]
  preChatFields: PreChatField[]
}

export type CoreConfig = {
  /**
   * API name for the deployment
   */
  developerName: string
  /**
   * Organization ID
   */
  organizationId: string
  /**
   * Service API URL
   */
  url: string
}

export enum ConversationEntryFormat {
  attachments = 'Attachments',
  carousel = 'Carousel',
  deliveryAcknowledgement = 'DeliveryAcknowledgement',
  imageMessage = 'Image',
  inputs = 'Inputs',
  listPicker = 'Buttons',
  message = 'Message',
  participantChanged = 'ParticipantChanged',
  quickReplies = 'QuickReplies',
  readAcknowledgement = 'ReadAcknowledgement',
  result = 'Result',
  richLink = 'RichLink',
  routingResult = 'RoutingResult',
  routingWorkResult = 'RoutingWorkResult',
  selections = 'Selections',
  sessionStatusChanged = 'SessionStatusChanged',
  text = 'Text',
  transcript = 'Transcript',
  typingIndicator = 'TypingIndicator',
  typingStartedIndicator = 'TypingStartedIndicator',
  typingStoppedIndicator = 'TypingStoppedIndicator',
  unknownEntry = 'UnknownEntry',
  unspecified = 'Unspecified',
  webview = 'WebView',
}

export enum ConversationEntryStatus {
  delivered = 'Delivered',
  error = 'Error',
  read = 'Read',
  sending = 'Sending',
  sent = 'Sent',
}

export enum ConversationEntrySenderRole {
  agent = 'Agent',
  chatbot = 'Chatbot',
  system = 'System',
  user = 'EndUser',
}

export enum SessionStatus {
  active = 'Active',
  consent = 'Consent',
  ended = 'Ended',
  error = 'Error',
  inactive = 'Inactive',
  new = 'New',
  unknown = 'Unknown',
  waiting = 'Waiting',
}

export type ConversationEntryBase = {
  conversationId: string
  entryId: string
  entryType: ConversationEntryFormat
  /**
   * the id of the ConversationEntry this is a reply to
   */
  inReplyToEntryId?: string
  messageType: string
  /**
   * @deprecated as it is used to see if we handle the payload properly
   */
  payloadDescription: string
  payloadId: string
  /**
   * sender of the ConversationEntry
   */
  sender: Participant
  /**
   * display name of the sender
   */
  senderDisplayName: string
  status: ConversationEntryStatus
  text?: string
  timestamp: number
  title?: string
  url?: string
}

export type ConversationEntry =
  | ConversationEntryText
  | ConversationEntryCarousel
  | ConversationEntryRichLink
  | ConversationEntryQuickReplies
  | ConversationEntryAttachments
  | ConversationEntryImageMessage
  | ConversationEntryInputs
  | ConversationEntryListPicker
  | ConversationEntrySelections
  | ConversationEntryWebview
  | ConversationEntryResult
  | ConversationEntryTypingStartedIndicator
  | ConversationEntryTypingStoppedIndicator
  | ConversationEntryUnspecified
  | ConversationEntryRoutingResult
  | ConversationEntryRoutingWorkResult
  | ConversationEntryParticipantChanged
  | ConversationEntryDeliveryAcknowledgement
  | ConversationEntryReadAcknowledgement
  | ConversationEntryTranscript
  | ConversationEntrySessionStatusChanged

export type Attachment = {
  file?: string
  id: string
  mimeType: string
  name: string
  url: string
}

export type TitleLinkItem = {
  interactionItems: Choice[]
  itemType: string
  referenceId?: string
  /**
   * @deprecated iOS only
   */
  secondarySubTitle?: string
  subTitle: string
  /**
   * @deprecated iOS only
   */
  tertiarySubTitle?: string
  title: string
}

export type Participant = {
  /**
   * display name of the participant
   */
  displayName: string
  /**
   * Is the participant the local user
   */
  local: boolean
  options: Choice[]
  /**
   * Participant role
   */
  role: ConversationEntrySenderRole
  subject: string
}

export type ConversationEntryTranscript = ConversationEntryBase & {
  format: ConversationEntryFormat.transcript
}

export type ConversationEntryText = ConversationEntryBase & {
  format: ConversationEntryFormat.text
  text: string
}
export type ConversationEntryImageMessage = ConversationEntryBase & {
  format: ConversationEntryFormat.imageMessage
  // TODO
}
export type ConversationEntryUnspecified = ConversationEntryBase & {
  format: ConversationEntryFormat.unspecified
}
export type ConversationEntryWebview = ConversationEntryBase & {
  format: ConversationEntryFormat.webview
  // TODO
}
export type ConversationEntryResult = ConversationEntryBase & {
  format: ConversationEntryFormat.result
  // TODO
}
export type ConversationEntryInputs = ConversationEntryBase & {
  format: ConversationEntryFormat.inputs
  // TODO
}
export type ConversationEntryListPicker = ConversationEntryBase & {
  choices: Choice[]
  format: ConversationEntryFormat.listPicker
  selected: Choice[]
  text: string
}
export type ConversationEntrySelections = ConversationEntryBase & {
  format: ConversationEntryFormat.selections
  selections: Choice[]
}

export type ConversationEntryCarousel = ConversationEntryBase & {
  attachments: Attachment[]
  format: ConversationEntryFormat.carousel
  items: TitleLinkItem[]
  selected: Choice[]
}

export type ConversationEntryAttachments = ConversationEntryBase & {
  attachments: Attachment[]
  format: ConversationEntryFormat.attachments
  text: string
}
export type ConversationEntryQuickReplies = ConversationEntryBase & {
  choices: Choice[]
  format: ConversationEntryFormat.quickReplies
  /**
   * @deprecated iOS only
   */
  selected: Choice[]
  text: string
}

export type ConversationEntryRichLink = ConversationEntryBase & {
  asset:
    | {
        height: number
        imageBase64: string
        width: number
      }
    | {
        url: string
      }
  format: ConversationEntryFormat.richLink
  title: string
  url: string
}

export type ConversationEntryTypingStartedIndicator = ConversationEntryBase & {
  format: ConversationEntryFormat.typingStartedIndicator
  startedTimestamp: number
}
export type ConversationEntryTypingStoppedIndicator = ConversationEntryBase & {
  format: ConversationEntryFormat.typingStoppedIndicator
  startedTimestamp: number
}
export type ConversationEntryRoutingResult = ConversationEntryBase & {
  /**
   * Estimated wait time in seconds.
   */
  estimatedWaitTime: number
  failureReason: string
  failureType: ConversationEntryRoutingFailureType
  format: ConversationEntryFormat.routingResult
  isEWTAvailable: boolean
  /**
   * @deprecated iOS only
   */
  isEWTRequested: boolean
  recordId: string
  routingType: ConversationEntryRoutingType
}
export type ConversationEntryRoutingWorkResult = ConversationEntryBase & {
  format: ConversationEntryFormat.routingWorkResult
  workType: ConversationEntryRoutingWorkType
}
export type ConversationEntryDeliveryAcknowledgement = ConversationEntryBase & {
  acknowledgedConversationEntryIdentifier: string
  acknowledgementTimestamp: number
  format: ConversationEntryFormat.deliveryAcknowledgement
}
export type ConversationEntryReadAcknowledgement = ConversationEntryBase & {
  acknowledgedConversationEntryIdentifier: string
  acknowledgementTimestamp: number
  format: ConversationEntryFormat.readAcknowledgement
}
export type ConversationEntryParticipantChanged = ConversationEntryBase & {
  format: ConversationEntryFormat.participantChanged
  operations: Array<{
    participant: Participant
    type: ParticipantChangedOperationType
  }>
}

export type ConversationEntrySessionStatusChanged =
  ConversationEntryUnspecified & {
    entryType: ConversationEntryFormat.sessionStatusChanged
    sessionEndTime?: number | null
    sessionEndedByRole?: ConversationEntrySenderRole | null
    sessionId?: string | null
    sessionStartTime?: number | null
    sessionStatus: SessionStatus
    sessionStatusPrev?: SessionStatus | null
  }

export enum ConversationEntryRoutingType {
  initial = 'Initial',
  transfer = 'Transfer',
}

export enum ConversationEntryRoutingFailureType {
  cancelled = 'Cancelled',
  none = 'None',
  routingError = 'RoutingError',
  submissionError = 'SubmissionError',
  unknown = 'Unknown',
}
export enum ConversationEntryRoutingWorkType {
  accepted = 'Accepted',
  assinged = 'Assinged',
  closed = 'Closed',
}

export enum ParticipantChangedOperationType {
  add = 'add',
  remove = 'remove',
}

export type Choice = {
  optionId: string
  optionValue: string
  parentEntryId: string
  title: string
}

export type RetrieveTranscriptResponse = {entryId: string; transcript: string}

export enum ConnectionState {
  closed = 'Closed',
  connecting = 'Connecting',
  open = 'Open',
}

export enum NetworkState {
  connected = 'Connected',
  offline = 'Offline',
}

export type CoreError = {
  message: string
}
