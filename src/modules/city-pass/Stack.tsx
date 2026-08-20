import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {usePendingScreen} from '@/hooks/navigation/usePendingScreen'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAccessCodeGate} from '@/modules/access-code/hooks/useAccessCodeGate'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {
  cityPassScreenConfig,
  type CityPassScreenConfigRoutes,
} from '@/modules/city-pass/screenConfig'
import {CityPassForgotAccessCodeScreen} from '@/modules/city-pass/screens/CityPassForgotAccessCode.screen'
import {CityPassIntroScreen} from '@/modules/city-pass/screens/CityPassIntro.screen'
import {LoginStepsScreen} from '@/modules/city-pass/screens/LoginSteps.screen'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {sortEntriesByKeyFirst} from '@/utils/sort/sortEntriesByKeyFirst'

const Stack = createStackNavigator<RootStackParams>()

export const ModuleStack = () => {
  const screenOptions = useScreenOptions()
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)

  const {pendingScreen} = usePendingScreen<CityPassScreenConfigRoutes>()
  const screenConfigPendingFirst = sortEntriesByKeyFirst(
    Object.entries(cityPassScreenConfig),
    pendingScreen,
  )

  const accessCodeGate = useAccessCodeGate(Stack, ModuleSlug['city-pass'], {
    loginSteps: {
      [CityPassRouteName.loginSteps]: {
        component: LoginStepsScreen,
        name: CityPassRouteName.loginSteps,
        options: {headerTitle: 'Inloggen'},
      },
    },
    forgotCodeScreen: {
      name: CityPassRouteName.forgotAccessCode,
      component: CityPassForgotAccessCodeScreen,
      options: {
        headerTitle: 'Toegangscode vergeten',
      },
    },
  })

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isCityPassOwnerRegistered ? (
        accessCodeGate(
          screenConfigPendingFirst.map(([key, route]) => (
            <Stack.Screen
              key={key}
              {...route}
            />
          )),
        )
      ) : (
        <>
          <Stack.Screen
            component={CityPassIntroScreen}
            name={CityPassRouteName.login}
            options={{headerTitle: 'Stadspas'}}
          />
          <Stack.Screen
            component={LoginStepsScreen}
            name={CityPassRouteName.loginSteps}
            options={{headerTitle: 'Inloggen'}}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
