import {useFocusEffect} from '@react-navigation/native'
import {useCallback} from 'react'
import {Linking} from 'react-native'
import {ModuleTitle} from '@/components/features/ModuleTitle'
import {Button} from '@/components/ui/buttons/Button'
import {DigiDButton} from '@/components/ui/buttons/DigiDButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRoute} from '@/hooks/navigation/useRoute'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useHandleLoginDeeplink} from '@/modules/mijn-amsterdam/hooks/useHandleLoginDeeplink'
import {useLoginMijnAmsterdam} from '@/modules/mijn-amsterdam/hooks/useLoginMijnAmsterdam'
import {useIsLoggedIn} from '@/modules/mijn-amsterdam/useIsLoggedIn'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'
import {Permissions} from '@/types/permissions'

export const Account = () => {
  const {navigate} = useNavigation()
  const {loginResult} = useRoute<UserRouteName.accounts>().params || {}
  const login = useLoginMijnAmsterdam()
  const {isLoggedIn, isLoading, refetch} = useIsLoggedIn()

  useHandleLoginDeeplink(loginResult)

  const {hasPermission} = usePermission(Permissions.notifications)

  useFocusEffect(
    useCallback(() => {
      void refetch()
    }, [refetch]),
  )

  if (isLoading) {
    return <PleaseWait testID="MijnAmsterdamAccountPleaseWait" />
  }

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
            <Column gutter="smd">
              <Paragraph>U bent ingelogd.</Paragraph>
              {hasPermission ? (
                <Paragraph>
                  U ontvangt nu meldingen van Mijn Amsterdam.
                </Paragraph>
              ) : (
                <Column gutter="xs">
                  <Row gutter="sm">
                    <Icon
                      name="bell-off"
                      size="lg"
                    />
                    <Phrase emphasis="strong">Meldingen staan uit</Phrase>
                  </Row>
                  <InlineLink
                    isExternal
                    onPress={() => Linking.openSettings()}
                    testID="UserAccountMijnAmsterdamOpenSettingsLink">
                    Ga naar Instellingen
                  </InlineLink>
                </Column>
              )}
            </Column>
            <Button
              label="Uitloggen"
              onPress={() =>
                navigate(ModuleSlug.user, {
                  screen: UserRouteName.logoutModule,
                  params: {slug: ModuleSlug['mijn-amsterdam']},
                })
              }
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
