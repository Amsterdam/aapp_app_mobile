export enum NotificationHistoryRouteName {
  NotificationHistory = 'NotificationHistory',
  NotificationRedirect = 'NotificationRedirect',
}

export type NotificationHistoryStackParams = {
  [NotificationHistoryRouteName.NotificationHistory]: undefined
  [NotificationHistoryRouteName.NotificationRedirect]: {
    url: string
  }
}

export enum NotificationHistoryModalName {}

export type NotificationHistoryModalParams = Record<string, never>
