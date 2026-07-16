import {ModuleTitle} from '@/components/features/ModuleTitle'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {RedirectKey} from '@/modules/redirects/types'
import {UserRouteName} from '@/modules/user/routes'

export const Account = () => {
  const {isLoggedIn, username} = useIsLoggedIn()
  const {navigate} = useNavigation()

  return (
    <Column gutter="smd">
      <ModuleTitle
        moduleSlug={ModuleSlug['boat-charging']}
        testID="UserAccountBoatChargingModuleTitle"
      />
      <Column gutter="lg">
        {isLoggedIn ? (
          <>
            <Paragraph>
              U bent ingelogd met <Phrase emphasis="strong">{username}</Phrase>
            </Paragraph>
            <Button
              label="Uitloggen"
              onPress={() =>
                navigate(ModuleSlug.user, {
                  screen: UserRouteName.logoutModule,
                  params: {slug: ModuleSlug['boat-charging']},
                })
              }
              testID="UserAccountBoatChargingLogoutButton"
              variant="secondary"
            />
          </>
        ) : (
          <>
            <Paragraph>Log in om uw boot op te laden.</Paragraph>
            <Button
              label="Inloggen"
              onPress={() =>
                navigate(ModuleSlug['boat-charging'], {
                  screen: BoatChargingRouteName.boatChargingLogin,
                })
              }
              testID="UserAccountBoatChargingLoginButton"
            />
            <ExternalLinkButton
              label="Account aanmaken"
              redirectKey={RedirectKey.boatChargingCreateAccount}
              testID="BoatChargingLoginFormCreateAccountButton"
              variant="tertiary"
            />
          </>
        )}
      </Column>
    </Column>
  )
}
