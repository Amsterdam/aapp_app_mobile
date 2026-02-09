import type {NavigationProps} from '@/app/navigation/types'
import type {MijnAmsterdamRouteName} from '@/modules/mijn-amsterdam/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {DigIDButton} from '@/components/ui/buttons/DigIDButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useHandleLoginDeeplink} from '@/modules/mijn-amsterdam/hooks/useHandleLoginDeeplink'
import {useLoginMijnAmsterdam} from '@/modules/mijn-amsterdam/hooks/useLoginMijnAmsterdam'
import {
  useGetMijnAmsterdamLoginStatusQuery,
  useMijnAmsterdamLogoutMutation,
} from '@/modules/mijn-amsterdam/service'

type Props = NavigationProps<MijnAmsterdamRouteName.settings>

export const MijnAmsterdamSettingsScreen = ({route}: Props) => {
  const {loginResult} = route.params || {}
  const {data: {isLoggedIn} = {isLoggedIn: false}, isLoading} =
    useGetMijnAmsterdamLoginStatusQuery()
  const [logout] = useMijnAmsterdamLogoutMutation()
  const login = useLoginMijnAmsterdam()

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
            {isLoading ? (
              <Paragraph>
                Blijf op de hoogte van uw aanvraag of klacht. Log 1 keer in met
                DigiD om meldingen te ontvangen.
              </Paragraph>
            ) : isLoggedIn ? (
              <>
                <Paragraph>
                  U ontvangt nu meldingen van Mijn Amsterdam.
                </Paragraph>
                <Button
                  label="Uitloggen"
                  onPress={() => logout()}
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
                <DigIDButton
                  isLoading={isLoading}
                  onPress={() => !isLoggedIn && !isLoading && login()}
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
