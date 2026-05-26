export default {}

export enum PreChatFieldTypes {
  checkbox = 'Checkbox',
  choiceList = 'ChoiceList',
  email = 'Email',
  number = 'Number',
  phone = 'Phone',
  text = 'Text',
  textArea = 'TextArea',
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

export enum ConnectionState {
  closed = 'Closed',
  connecting = 'Connecting',
  open = 'Open',
}

export enum NetworkState {
  connected = 'Connected',
  offline = 'Offline',
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
