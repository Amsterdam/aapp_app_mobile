import 'react-native-gesture-handler'
import {AppRegistry, Platform} from 'react-native'
import {name as appName} from './app.json'
// oxlint-disable-next-line amsterdam/no-relative-file-import
import {App} from './src/app/App'

// eslint-disable-next-line no-process-env
process.env.EXPO_OS = Platform.OS

AppRegistry.registerComponent(appName, () => App)
