import {NavigationContainer} from '@react-navigation/native'
import {type ReactNode} from 'react'
import {createLinking} from '@/app/navigation/linking'
import {navigationRef} from '@/app/navigation/navigationRef'
import {type RootStackParams} from '@/app/navigation/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useStore} from '@/hooks/redux/useStore'
import {useHideSplashScreen} from '@/hooks/useHideSplashScreen'
import {ModuleSlug} from '@/modules/slugs'
import {devError} from '@/processes/development'
import {useLogStartup} from '@/processes/logging/hooks/useLogStartup'
import {useRegisterNavigationContainerForLogging} from '@/processes/logging/hooks/useRegisterNavigationContainerForLogging'

type Props = {
  children: ReactNode
}

export const AppNavigationContainer = ({children}: Props) => {
  const hideSplashScreen = useHideSplashScreen()
  const logStartup = useLogStartup()
  const dispatch = useDispatch()
  const store = useStore()

  const registerNavigationContainerForLogging =
    useRegisterNavigationContainerForLogging()

  return (
    <NavigationContainer<RootStackParams>
      linking={createLinking(dispatch, () => store.getState())}
      onReady={() => {
        registerNavigationContainerForLogging(navigationRef)
        hideSplashScreen()
        logStartup()
      }}
      onUnhandledAction={action => {
        devError('Unhandled action', action)
        navigationRef.current?.navigate(ModuleSlug.home)
      }}
      ref={navigationRef}>
      {children}
    </NavigationContainer>
  )
}
