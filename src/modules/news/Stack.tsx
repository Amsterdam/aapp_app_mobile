import type {ModuleStackParams} from '@/modules/stacks'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useAccessCodeGate} from '@/modules/access-code/hooks/useAccessCodeGate'
import {useAdvanceHighlightedArticle} from '@/modules/news/hooks/useAdvanceHighlightedArticle'
import {NewsRouteName} from '@/modules/news/routes'
import {screenConfig} from '@/modules/news/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const ModuleStack = () => {
  const screenOptions = useScreenOptions()
  const {accessCodeGateScreen} = useAccessCodeGate<ModuleStackParams>(Stack)

  useAdvanceHighlightedArticle()

  return (
    <Stack.Navigator
      initialRouteName={NewsRouteName.dashboard}
      screenOptions={screenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => {
        if (route.options?.accessCodeGate) {
          return accessCodeGateScreen(route)
        }

        return (
          <Stack.Screen
            key={key}
            {...route}
          />
        )
      })}
    </Stack.Navigator>
  )
}
