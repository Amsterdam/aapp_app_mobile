import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import {productTourSlice} from '@/components/features/product-tour/slice'
import {accessCodeSlice} from '@/modules/access-code/slice'
import {electionsSlice} from '@/modules/elections/slice'
import {clientModules, coreModules} from '@/modules/modules'
import {reduxLoggerMiddleware} from '@/processes/logging/reduxLoggerMiddleware'
import {baseApi} from '@/services/baseApi'
import {devStoreEnhancer} from '@/store/devStoreEnhancer'
import {getReduxConfigs, getReducers} from '@/store/getReducers'
import {alertSlice} from '@/store/slices/alert'
import {environmentSlice} from '@/store/slices/environment'
import {internetConnectionSlice} from '@/store/slices/internetConnection'
import {menuSlice} from '@/store/slices/menu'
import {modulesSlice} from '@/store/slices/modules'
import {permissionsSlice} from '@/store/slices/permissions'
import {screenSlice} from '@/store/slices/screen'
import {secureStorageSlice} from '@/store/slices/secureStorage'
import {updateAppSlice} from '@/store/slices/updateApp'
import {ReduxConfig} from '@/store/types/reduxConfig'
import {ReduxKey} from '@/store/types/reduxKey'
import {themeSlice} from '@/themes/slice'

const baseFunctionalitySlicesConfig: ReduxConfig[] = [
  {key: ReduxKey.accessCode, slice: accessCodeSlice},
  {key: ReduxKey.alert, slice: alertSlice},
  {key: ReduxKey.elections, slice: electionsSlice},
  {key: ReduxKey.environment, slice: environmentSlice, persistVersion: 0},
  {key: ReduxKey.internetConnection, slice: internetConnectionSlice},
  {key: ReduxKey.menu, slice: menuSlice},
  {key: ReduxKey.modules, slice: modulesSlice, persistVersion: 0},
  {key: ReduxKey.permissions, slice: permissionsSlice},
  {key: ReduxKey.productTour, slice: productTourSlice, persistVersion: 0},
  {key: ReduxKey.secureStorage, slice: secureStorageSlice, persistVersion: 0},
  {key: ReduxKey.theme, slice: themeSlice},
  {key: ReduxKey.screen, slice: screenSlice},
  {key: ReduxKey.updateApp, slice: updateAppSlice, persistVersion: 0},
]

const reducers = getReducers([
  ...baseFunctionalitySlicesConfig,
  ...getReduxConfigs(coreModules),
  ...getReduxConfigs(clientModules),
])

export const store = configureStore({
  enhancers: devStoreEnhancer,
  reducer: combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    ...reducers,
  }),
  devTools: false,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 256,
      },
      immutableCheck: {
        warnAfter: 256,
      },
    }).concat([baseApi.middleware, reduxLoggerMiddleware]),
})
