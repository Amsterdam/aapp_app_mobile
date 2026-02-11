import simplur from 'simplur'
import {ModuleTitle} from '@/components/features/ModuleTitle'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccounts} from '@/modules/parking/slice'
import {useIsLoggedIn} from '@/modules/parking/useIsLoggedIn'
import {ModuleSlug} from '@/modules/slugs'

export const Account = () => {
  const isLoggedIn = useIsLoggedIn()
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
            {/* <Button
              label="Uitloggen"
              onPress={logout}
              testID="UserAccountParkingLogoutButton"
              variant="secondary"
            /> */}
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
