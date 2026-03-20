import simplur from 'simplur'
import {ModuleTitle} from '@/components/features/ModuleTitle'
import {Button} from '@/components/ui/buttons/Button'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccounts} from '@/modules/parking/slice'
import {useIsLoggedIn} from '@/modules/parking/useIsLoggedIn'
import {ModuleSlug} from '@/modules/slugs'

export const Account = () => {
  const {isLoggedIn} = useIsLoggedIn()
  const {navigate} = useNavigation()
  const accounts = useParkingAccounts()
  const numberOfAccounts = Object.keys(accounts ?? {}).length

  return (
    <Column gutter="smd">
      <ModuleTitle
        moduleSlug={ModuleSlug.parking}
        testID="UserAccountParkingModuleTitle"
      />
      <Column gutter="lg">
        {isLoggedIn ? (
          <>
            <Paragraph>
              U bent ingelogd met {simplur`${numberOfAccounts} account[|s]`}.
            </Paragraph>
            <NavigationButton
              chevronSize="md"
              emphasis="default"
              horizontallyAlign="start"
              insetHorizontal="no"
              insetVertical="no"
              onPress={() =>
                navigate(ModuleSlug.parking, {
                  screen: ParkingRouteName.accounts,
                })
              }
              testID="UserAccountParkingAccountsNavigationButton"
              title="Beheer account en uitloggen"
            />
          </>
        ) : (
          <>
            <Paragraph>
              Log in als vergunninghouder of bezoeker om de parkeersessie te
              starten en te betalen.
            </Paragraph>
            <Button
              label="Inloggen"
              onPress={() =>
                navigate(ModuleSlug.parking, {
                  screen: ParkingRouteName.login,
                })
              }
              testID="UserAccountParkingLoginButton"
            />
          </>
        )}
      </Column>
    </Column>
  )
}
