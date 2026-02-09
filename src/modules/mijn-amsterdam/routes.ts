import type {RedirectErrorCodes} from '@/types/mijnAmsterdam'
import type {LoginResult} from '@/types/navigation'

export enum MijnAmsterdamRouteName {
  settings = 'Settings',
}

export type MijnAmsterdamStackParams = {
  [MijnAmsterdamRouteName.settings]:
    | {
        'amp;errorCode'?: string
        errorCode?: RedirectErrorCodes
        errorMessage?: string
        loginResult?: LoginResult
      }
    | undefined
}
// amsterdam://notifications/mislukt?errorMessage=Verzenden%20van%20consumerId%20naar%20de%20Amsterdam%20app%20niet%20gelukt&amp;errorCode=002
