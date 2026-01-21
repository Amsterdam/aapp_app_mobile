import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useStore} from '@/hooks/redux/useStore'
import {alerts} from '@/modules/parking/alerts'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useParkingAccount, useParkingAccounts} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {logout} from '@/modules/parking/utils/logout'
import {useAlert} from '@/store/slices/alert'

type Props = NavigationProps<ParkingRouteName.logout>

export const ParkingLogoutScreen = ({navigation: {goBack}}: Props) => {
  const dispatch = useDispatch()
  const store = useStore()
  const {setAlert} = useAlert()
  const accounts = useParkingAccounts()
  const parkingAccount = useParkingAccount()
  const {name} = parkingAccount || {}
  const isVisitor = parkingAccount?.scope === ParkingPermitScope.visitor

  return (
    <Screen testID="ParkingLogoutScreen">
      <Box>
        <Column gutter="lg">
          {name || isVisitor ? (
            <Title
              level="h2"
              testID="ParkingLogoutScreenTitle"
              text={name ?? 'Account bezoeker'}
            />
          ) : null}
          {parkingAccount?.permits?.length ? (
            <Column gutter="sm">
              <Title
                level="h3"
                testID="ParkingLogoutScreenSubtitle"
                text="U logt uit op deze vergunningen:"
              />
              {parkingAccount.permits.map(permit => (
                <Box key={permit.report_code}>
                  <Row gutter="md">
                    <Icon
                      name={isVisitor ? 'person' : 'documentCheckmark'}
                      size="lg"
                      testID="ParkingLogoutScreenPermitIcon"
                    />
                    <Title
                      level="h4"
                      testID={`ParkingLogoutScreenPermit-${permit.report_code}Title`}
                      text={permit.permit_name}
                    />
                  </Row>
                </Box>
              ))}
            </Column>
          ) : null}
          <Button
            label="Uitloggen"
            onPress={async () => {
              await logout(false, dispatch, store.getState())

              if (Object.keys(accounts).length > 1) {
                setAlert(alerts.logoutWithAnotherAccountSuccess)
                goBack()
              }
            }}
            testID="ParkingLogoutScreenLogoutButton"
          />
          <Button
            label="Annuleren"
            onPress={goBack}
            testID="ParkingLogoutScreenCancelButton"
            variant="secondary"
          />
        </Column>
      </Box>
    </Screen>
  )
}
