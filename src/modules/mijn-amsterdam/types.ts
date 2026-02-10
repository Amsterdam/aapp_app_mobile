export type GetMijnAmsterdamLogin = {
  status: MijnAmsterdamLoginStatus
}
export enum MijnAmsterdamLoginStatus {
  loggedIn = 'OK',
  loggedOut = 'ERROR',
}
