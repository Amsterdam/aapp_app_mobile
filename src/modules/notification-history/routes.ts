export enum NotificationHistoryRouteName {
  NotificationHistory = 'NotificationHistory',
  NotificationRedirect = 'NotificationRedirect',
}

export type ModuleStackParams = {
  [NotificationHistoryRouteName.NotificationHistory]: undefined
  [NotificationHistoryRouteName.NotificationRedirect]:
    | {
        body?: string
        title?: string
        url: string
      }
    | undefined
}
