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
  const accessCodeGate = useAccessCodeGate(Stack, {
    screenOptions,
  })

  useAdvanceHighlightedArticle()

  return (
    <Stack.Navigator
      initialRouteName={NewsRouteName.dashboard}
      screenOptions={screenOptions}>
      {accessCodeGate(
        Object.entries(screenConfig).map(([key, route]) => (
          <Stack.Screen
            key={key}
            {...route}
          />
        )),
      )}
    </Stack.Navigator>
  )
}
