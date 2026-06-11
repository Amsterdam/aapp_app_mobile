import {useEffect} from 'react'
import {useBoatChargingOidcSettingsQuery} from '@/modules/boat-charging/service'
import {initAuthClient} from '@/modules/boat-charging/utils/okta'

export const useInitAuth = () => {
  const {data: oidcSettings} = useBoatChargingOidcSettingsQuery()

  useEffect(() => {
    if (oidcSettings) {
      initAuthClient({
        issuer: oidcSettings.issuer,
        clientId: oidcSettings.client_id,
        redirectUri: oidcSettings.redirect_uri,
        scopes: oidcSettings.scopes,
        responseType: oidcSettings.response_type,
        pkce: oidcSettings.pkce_required === 'true',
      })
    }
  }, [oidcSettings])
}
