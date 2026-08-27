import {ParamListBase} from '@react-navigation/native'
// eslint-disable-next-line no-restricted-imports
import {createStackNavigator as createStackNavigatorOriginal} from '@react-navigation/stack'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'

export const createStackNavigator = <T extends ParamListBase>() => {
  const {Navigator, ...rest} = createStackNavigatorOriginal<T>()

  const CustomNavigator: typeof Navigator = ({screenOptions, ...props}) => {
    const isReduceMotionEnabled = useIsReduceMotionEnabled()

    return (
      <Navigator
        {...props}
        screenOptions={screenOptionsProps => ({
          animation: isReduceMotionEnabled ? 'none' : undefined,
          ...(typeof screenOptions === 'function'
            ? screenOptions(screenOptionsProps)
            : screenOptions),
        })}
      />
    )
  }

  return {...rest, Navigator: CustomNavigator}
}
