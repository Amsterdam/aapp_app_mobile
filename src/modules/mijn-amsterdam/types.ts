export type GetMijnAmsterdamLogin = {
  profile_name?: string
  status: MijnAmsterdamLoginStatus
}
export enum MijnAmsterdamLoginStatus {
  loggedIn = 'OK',
  loggedOut = 'ERROR',
}
