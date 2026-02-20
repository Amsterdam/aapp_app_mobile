import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useStore} from '@/hooks/redux/useStore'
import {alerts} from '@/modules/parking/alerts'
import {logout} from '@/modules/parking/utils/logout'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'
import {useAlert} from '@/store/slices/alert'

type Props = {
  accountReportCode?: string
  hasMoreAccounts: boolean
  routeReportCode?: string
}

export const ParkingLogoutButton = ({
  accountReportCode,
  hasMoreAccounts,
  routeReportCode,
}: Props) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const store = useStore()
  const {setAlert} = useAlert()

  return (
    <Button
      label="Uitloggen"
      onPress={async () => {
        await logout(dispatch, store.getState(), undefined, accountReportCode)

        if (hasMoreAccounts) {
          setAlert(alerts.logoutWithAnotherAccountSuccess)
          navigation.goBack()
        } else {
          routeReportCode &&
            navigation.popTo(ModuleSlug.user, {screen: UserRouteName.accounts})
        }
      }}
      testID="ParkingLogoutScreenLogoutButton"
    />
  )
}
