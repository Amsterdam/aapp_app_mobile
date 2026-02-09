export type GetMijnAmsterdamLogin = {
  status: GetMijnAmsterdamLoginStatus
}
export enum GetMijnAmsterdamLoginStatus {
  loggedIn = 'OK',
  loggedOut = 'ERROR',
}
