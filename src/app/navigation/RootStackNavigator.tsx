import {CardStyleInterpolators} from '@react-navigation/stack'
import {Platform} from 'react-native'
import {InactiveModuleGuard} from '@/app/navigation/InactiveModuleGuard'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {allModules} from '@/modules/modules'
import {useShouldShowOnboarding} from '@/modules/onboarding/slice'
import {ModuleSlug} from '@/modules/slugs'
import {getModuleStack, modals} from '@/modules/stacks'

const Stack = createStackNavigator<RootStackParams>()

const moduleStacks = allModules.map(({screenOptions: options, slug}) => {
  const stack = getModuleStack(slug)

  if (!stack) {
    return null
  }

  return (
    <Stack.Screen
      children={props => (
        <InactiveModuleGuard
          component={stack}
          slug={slug}
          {...props}
        />
      )}
      key={slug}
      name={slug}
      options={options}
    />
  )
})

const modalStacks = Object.entries(modals).map(([key, route]) => (
  <Stack.Screen
    key={key}
    {...route}
    options={{
      cardStyleInterpolator:
        Platform.OS === 'ios'
          ? CardStyleInterpolators.forModalPresentationIOS
          : undefined,
    }}
  />
))

export const RootStackNavigator = () => {
  const shouldShowOnboarding = useShouldShowOnboarding()
  const screenOptions = useScreenOptions({
    isBelowStatusBar: Platform.OS === 'android',
  })

  return (
    <Stack.Navigator
      initialRouteName={
        !shouldShowOnboarding ? ModuleSlug.onboarding : ModuleSlug.home
      }
      screenOptions={{
        headerShown: false,
      }}>
      {moduleStacks}
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          ...screenOptions,
        }}>
        {modalStacks}
      </Stack.Group>
    </Stack.Navigator>
  )
}
