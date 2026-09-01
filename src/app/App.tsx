import {StyleSheet} from 'react-native'
import {SystemBars} from 'react-native-edge-to-edge'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import {PersistGate} from 'redux-persist/integration/react'
import {CustomErrorBoundary} from '@/app/CustomErrorBoundary'
import {Init} from '@/app/Init'
import {UpdateScreen} from '@/app/UpdateScreen'
import {AppNavigationContainer} from '@/app/navigation/AppNavigationContainer'
import {RootStackNavigator} from '@/app/navigation/RootStackNavigator'
import {AppInsightsProvider} from '@/providers/appinsights.provider'
import {RootProvider} from '@/providers/root.provider'
import {persistor} from '@/store/persistor'
import {lightColorTokens} from '@/themes/tokens/color-light'
import '@/processes/logging'

export const App = () => (
  <AppInsightsProvider>
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={styles.appContainer}>
      <GestureHandlerRootView style={styles.flex}>
        <CustomErrorBoundary>
          <SystemBars style="dark" />
          <RootProvider>
            <PersistGate
              loading={null}
              persistor={persistor}>
              <UpdateScreen>
                <AppNavigationContainer>
                  <Init>
                    <CustomErrorBoundary>
                      <RootStackNavigator />
                    </CustomErrorBoundary>
                  </Init>
                </AppNavigationContainer>
              </UpdateScreen>
            </PersistGate>
          </RootProvider>
        </CustomErrorBoundary>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  </AppInsightsProvider>
)

const styles = StyleSheet.create({
  appContainer: {
    // This is needed to prevent black flashing screen between splash screen when using dark-mode on iOS
    backgroundColor: lightColorTokens.screen.background.default,
  },
  flex: {
    flex: 1,
  },
})
