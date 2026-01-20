export enum NotificationHistoryRouteName {
  NotificationExternalLink = 'NotificationExternalLink',
  NotificationHistory = 'NotificationHistory',
}

export type NotificationHistoryStackParams = {
  [NotificationHistoryRouteName.NotificationHistory]: undefined
  [NotificationHistoryRouteName.NotificationExternalLink]: {
    url: string
  }
}

export enum NotificationHistoryModalName {}

export type NotificationHistoryModalParams = Record<string, never>
