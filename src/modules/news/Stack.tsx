import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useAdvanceHighlightedArticle} from '@/modules/news/hooks/useAdvanceHighlightedArticle'
import {NewsRouteName} from '@/modules/news/routes'
import {screenConfig} from '@/modules/news/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const NewsStack = () => {
  const screenOptions = useScreenOptions()

  useAdvanceHighlightedArticle()

  return (
    <Stack.Navigator
      initialRouteName={NewsRouteName.dashboard}
      screenOptions={screenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
