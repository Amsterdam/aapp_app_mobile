import type {NavigationProps} from '@/app/navigation/types'
import type {MijnAmsterdamRouteName} from '@/modules/mijn-amsterdam/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {DigiDButton} from '@/components/ui/buttons/DigiDButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {alerts} from '@/modules/mijn-amsterdam/alerts'
import {useHandleLoginDeeplink} from '@/modules/mijn-amsterdam/hooks/useHandleLoginDeeplink'
import {useIsLoggedIn} from '@/modules/mijn-amsterdam/hooks/useIsLoggedIn'
import {useLoginMijnAmsterdam} from '@/modules/mijn-amsterdam/hooks/useLoginMijnAmsterdam'
import {useMijnAmsterdamLogoutMutation} from '@/modules/mijn-amsterdam/service'
import {useAlert} from '@/store/slices/alert'

type Props = NavigationProps<MijnAmsterdamRouteName.settings>

export const MijnAmsterdamSettingsScreen = ({route}: Props) => {
  const {loginResult} = route.params || {}
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
    <Screen
      hasStickyAlert
      testID="MijnAmsterdamSettingsScreen">
      <Box>
        <Box
          insetHorizontal="md"
          insetVertical="lg"
          variant="distinct">
          <Column gutter="lg">
            {isLoggedIn ? (
              <>
                <Paragraph>
                  U ontvangt nu meldingen van Mijn Amsterdam.
                </Paragraph>
                <Button
                  label="Uitloggen"
                  onPress={logout}
                  testID="MijnAmsterdamLogoutButton"
                  variant="secondary"
                />
              </>
            ) : (
              <>
                <Paragraph>
                  Blijf op de hoogte van uw aanvraag of klacht. Log 1 keer in
                  met DigiD om meldingen te ontvangen.
                </Paragraph>
                <DigiDButton
                  onPress={login}
                  testID="MijnAmsterdamLoginButton"
                />
              </>
            )}
          </Column>
        </Box>
      </Box>
    </Screen>
  )
}
