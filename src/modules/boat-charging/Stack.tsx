import {useEffect} from 'react'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {usePendingScreen} from '@/hooks/navigation/usePendingScreen'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAccessCodeGate} from '@/modules/access-code/hooks/useAccessCodeGate'
import {useLoginSteps} from '@/modules/access-code/hooks/useLoginSteps'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {NewSessionFormProvider} from '@/modules/boat-charging/providers/NewSessionForm.provider'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {screenConfig} from '@/modules/boat-charging/screenConfig'
import {BoatChargingForgotAccessCodeScreen} from '@/modules/boat-charging/screens/BoatChargingForgotAccessCode.screen'
import {LoginStepsScreen} from '@/modules/boat-charging/screens/LoginSteps.screen'
import {
  selectPendingScreen,
  setPendingScreen,
} from '@/modules/boat-charging/slice'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {sortEntriesByKeyFirst} from '@/utils/sort/sortEntriesByKeyFirst'

const Stack = createStackNavigator<RootStackParams>()

export const ModuleStack = () => {
  const screenOptions = useScreenOptions()
  const screenOptionsSettings = useScreenOptions({
    screenType: 'settings',
  })
  const dispatch = useDispatch()

  const [pendingScreen] = useSelector(selectPendingScreen) ?? []

  const {pendingScreen: pendingScreenFromParam} =
    usePendingScreen<BoatChargingRouteName>()

  const screenConfigPendingFirst = sortEntriesByKeyFirst(
    Object.entries(screenConfig),
    pendingScreen || pendingScreenFromParam,
  )

  const {isLoggedIn} = useIsLoggedIn()
  const {isLoginStepsActive} = useLoginSteps(ModuleSlug['boat-charging'])

  const accessCodeGate = useAccessCodeGate(Stack, {
    isLoginStepsActive,
    loginSteps: {
      [BoatChargingRouteName.loginSteps]: {
        component: LoginStepsScreen,
        name: BoatChargingRouteName.loginSteps,
        options: {
          headerTitle: 'Inloggen',
        },
      },
    },
    forgotCodeScreen: {
      component: BoatChargingForgotAccessCodeScreen,
      name: BoatChargingRouteName.forgotAccessCode,
      options: {
        headerTitle: 'Toegangscode vergeten',
      },
    },
    shouldRenderGate: isLoggedIn,
  })

  useEffect(
    () => () => {
      dispatch(setPendingScreen(undefined))
    },
    [dispatch],
  )

  return (
    <Stack.Navigator
      layout={NewSessionFormProvider}
      screenOptions={screenOptions}>
      {accessCodeGate(
        screenConfigPendingFirst.map(([key, route]) => (
          <Stack.Screen
            key={key}
            {...route}
            options={{
              ...(route.screenType === 'settings' && screenOptionsSettings),
              ...route.options,
            }}
          />
        )),
      )}
    </Stack.Navigator>
  )
}
