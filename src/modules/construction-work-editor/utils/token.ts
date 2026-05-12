import {decode} from 'base-64'
global.atob = decode
import {jwtDecode} from 'jwt-decode'
import {DecodedJwtToken} from '@/modules/construction-work-editor/types'
import {devLog} from '@/processes/development'
import {SeverityLevel, ExceptionLogKey} from '@/processes/logging/types'
import {appInsights} from '@/providers/appinsights.provider'

export const decryptToken = (token: string) => jwtDecode<DecodedJwtToken>(token)

export const isTokenValid = (token: string | undefined) => {
  if (!token) {
    return false
  }

  try {
    const decryptedToken = decryptToken(token)

    if (Date.now() >= (decryptedToken.exp ?? 0) * 1000) {
      devLog('construction-work-editor', 'access token expired')

      return false
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    appInsights.trackException({
      exception: new Error(ExceptionLogKey.tokenInvalid),
      severityLevel: SeverityLevel.Warning,
      properties: {token},
    })

    return false
  }

  return true
}
