import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {screenConfig} from '@/modules/report-problem/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const ModuleStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={ReportProblemRouteName.reportProblem}
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
