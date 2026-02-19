import {ModuleTitle} from '@/components/features/ModuleTitle'
import {Button} from '@/components/ui/buttons/Button'
import {DigiDButton} from '@/components/ui/buttons/DigiDButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {useIsLoggedIn} from '@/modules/city-pass/useIsLoggedIn'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'

export const Account = () => {
  const {isLoggedIn} = useIsLoggedIn()
  const {navigate} = useNavigation()

  return (
    <Column gutter="smd">
      <ModuleTitle
        moduleSlug={ModuleSlug['city-pass']}
        testID="UserAccountCityPassModuleTitle"
      />
      <Column gutter="lg">
        {isLoggedIn ? (
          <>
            <Paragraph>U bent ingelogd.</Paragraph>
            <Button
              label="Uitloggen"
              onPress={() =>
                navigate(ModuleSlug.user, {
                  screen: UserRouteName.logoutModule,
                  params: {slug: ModuleSlug['city-pass']},
                })
              }
              testID="UserAccountCityPassLogoutButton"
              variant="secondary"
            />
          </>
        ) : (
          <>
            <Paragraph>
              Log in met DigiD en zet uw Stadpas in de app. Daarna kunt u de
              Stadspas offline gebruiken en laten scannen.
            </Paragraph>
            <DigiDButton
              onPress={() =>
                navigate(ModuleSlug['city-pass'], {
                  screen: CityPassRouteName.login,
                })
              }
              testID="UserAccountCityPassLoginButton"
            />
          </>
        )}
      </Column>
    </Column>
  )
}
