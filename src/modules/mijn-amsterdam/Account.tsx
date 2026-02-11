import type {UserRouteName} from '@/modules/user/routes'
import {ModuleTitle} from '@/components/features/ModuleTitle'
import {Button} from '@/components/ui/buttons/Button'
import {DigiDButton} from '@/components/ui/buttons/DigiDButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useRoute} from '@/hooks/navigation/useRoute'
import {alerts} from '@/modules/mijn-amsterdam/alerts'
import {useHandleLoginDeeplink} from '@/modules/mijn-amsterdam/hooks/useHandleLoginDeeplink'
import {useLoginMijnAmsterdam} from '@/modules/mijn-amsterdam/hooks/useLoginMijnAmsterdam'
import {useMijnAmsterdamLogoutMutation} from '@/modules/mijn-amsterdam/service'
import {useIsLoggedIn} from '@/modules/mijn-amsterdam/useIsLoggedIn'
import {ModuleSlug} from '@/modules/slugs'
import {useAlert} from '@/store/slices/alert'

export const Account = () => {
  const {loginResult} = useRoute<UserRouteName.accounts>().params || {}
  const [logoutMutation] = useMijnAmsterdamLogoutMutation()
  const login = useLoginMijnAmsterdam()
  const isLoggedIn = useIsLoggedIn()
  const {setAlert} = useAlert()

  const logout = () => {
    logoutMutation()
      .unwrap()
      .catch(() => {
        setAlert(alerts.logoutFailed)
      })
  }

  useHandleLoginDeeplink(loginResult)

  return (
    <Column gutter="smd">
      <ModuleTitle
        moduleSlug={ModuleSlug['mijn-amsterdam']}
        noNavigate
        testID="UserAccountMijnAmsterdamModuleTitle"
      />
      <Column gutter="lg">
        {isLoggedIn ? (
          <>
            <Paragraph>U ontvangt nu meldingen van Mijn Amsterdam.</Paragraph>
            <Button
              label="Uitloggen"
              onPress={logout}
              testID="UserAccountMijnAmsterdamLogoutButton"
              variant="secondary"
            />
          </>
        ) : (
          <>
            <Paragraph>
              Blijf op de hoogte van uw aanvraag of klacht. Log 1 keer in met
              DigiD om meldingen te ontvangen.
            </Paragraph>
            <DigiDButton
              onPress={login}
              testID="UserAccountMijnAmsterdamLoginButton"
            />
          </>
        )}
      </Column>
    </Column>
  )
}
