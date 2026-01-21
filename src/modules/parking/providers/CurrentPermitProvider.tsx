import type {ReactNode} from 'react'
import {navigationRef} from '@/app/navigation/navigationRef'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {CurrentPermitContext} from '@/modules/parking/providers/CurrentPermit.context'
import {logout} from '@/modules/parking/utils/logout'
import {store} from '@/store/store'
import {RootState} from '@/store/types/rootState'

type Props = {
  children: ReactNode
}

export const CurrentPermitProvider = ({children}: Props) => {
  const dispatch = useDispatch()
  const {currentPermit, isLoading, refetch} = useGetCurrentParkingPermit()
  const {headerShown = true} = (navigationRef.current?.getCurrentOptions() ??
    {}) as {headerShown?: boolean}

  const onPressLogout = () => {
    void logout(false, dispatch, store.getState() as RootState)
  }

  if (isLoading) {
    return (
      <Screen
        bottomSheet={!headerShown}
        testID="ParkingCurrentPermitProviderScreen">
        <PleaseWait testID="ParkingCurrentPermitProviderPleaseWait" />
      </Screen>
    )
  }

  if (!currentPermit) {
    return (
      <Screen
        bottomSheet={!headerShown}
        testID="ParkingCurrentPermitProviderScreen">
        <Box>
          <Column gutter="lg">
            <SomethingWentWrong
              retryFn={refetch}
              testID="ParkingCurrentPermitProviderSomethingWentWrong"
              text="U heeft momenteel geen parkeervergunningen."
              title="Helaas"
            />
            <Button
              label="Uitloggen"
              onPress={onPressLogout}
              testID="ParkingCurrentPermitProviderSomethingWentWrongLogoutButton"
            />
          </Column>
        </Box>
      </Screen>
    )
  }

  return (
    <CurrentPermitContext.Provider value={currentPermit}>
      {children}
    </CurrentPermitContext.Provider>
  )
}
