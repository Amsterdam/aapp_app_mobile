export enum NotificationHistoryRouteName {
  NotificationHistory = 'NotificationHistory',
  NotificationRedirect = 'NotificationRedirect',
}

export type NotificationHistoryStackParams = {
  [NotificationHistoryRouteName.NotificationHistory]: undefined
  [NotificationHistoryRouteName.NotificationRedirect]:
    | {
        body?: string
        title?: string
        url: string
      }
    | undefined
}

export enum NotificationHistoryModalName {}

export type NotificationHistoryModalParams = Record<string, never>
