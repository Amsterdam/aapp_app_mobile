import {type EventDetail, type EventType} from '@notifee/react-native'
import {
  type NavigationState,
  type PartialState,
  type PathConfigMap,
} from '@react-navigation/native'
import {type StackNavigationOptions} from '@react-navigation/stack'
import type {Address} from '@/modules/address/types'
import {type RootStackParams, type RouteProp} from '@/app/navigation/types'
import {
  type SvgIconName,
  type SvgIconVariantConfig,
} from '@/components/ui/media/svgIcons'
import {type ReduxDispatch} from '@/hooks/redux/types'
import {type ModuleSlug} from '@/modules/slugs'
import {type UserMenuSection} from '@/modules/user/types'
import {type CustomDimensionKeys} from '@/processes/piwik/types'
import {type ReduxConfig} from '@/store/types/reduxConfig'
import {type RootState} from '@/store/types/rootState'
import {type PushNotification} from '@/types/notification'

/**
 * The config properties that are shared between core and non-core modules.
 */
export type CoreModuleConfig = {
  /**
   * The log dimension to log the enabled state of this module
   */
  logDimension?: CustomDimensionKeys
  /**
   * The module’s route name.
   * @see https://reactnavigation.org/docs/stack-navigator/#api-definition
   */
  name?: string
  /**
   * Configuration used to initialize the Redux state
   */
  reduxConfigs?: ReduxConfig[]
  /**
   * The module’s screen options.
   * @see https://reactnavigation.org/docs/stack-navigator/#options
   */
  screenOptions?:
    | StackNavigationOptions
    | ((props: {
        navigation: unknown
        route: RouteProp<ModuleSlug>
      }) => StackNavigationOptions)
  /**
   * A unique human-readable identifier for the module.
   */
  slug: ModuleSlug
}

/**
 * The client part of a non-core module’s configuration.
 */
export type ModuleClientConfig<
  PushNotificationData extends Record<string, unknown> = Record<
    string,
    unknown
  >,
  Icons extends SvgIconVariantConfig | void = void,
> = CoreModuleConfig & {
  /**
   * If true, the user is not allowed to disable the module in the settings.
   */
  alwaysEnabled?: boolean
  /**
   * Determines whether the module should be hidden on the home screen.
   */
  hiddenInMenu?: boolean
  /**
   * Module specific icons.
   */
  icons?: Icons
  /**
   * The module's deeplink configuration.
   * @see https://reactnavigation.org/docs/configuring-links
   */
  linking?: PathConfigMap<RootStackParams>
  /**
   * Function to call the logout logic of the module.
   */
  logout?: (dispatch: ReduxDispatch, state: RootState) => Promise<void>
  /**
   * Function to call when My address changes.
   */
  onMyAddressChanged?: (
    newAddress: Address | null,
    dispatch: ReduxDispatch,
  ) => Promise<unknown>
  /**
   * Module specific logic for handling notification events
   * @param type Interaction type with the notification, for example Press or Delivered
   * @param detail details of the event
   * @param dispatch Redux dispatch function
   */
  onNotificationEvent?: (
    type: EventType,
    detail: Omit<EventDetail, 'notification'> & {
      notification?: PushNotification<PushNotificationData>
    },
    isPushNotificationDeeplink: boolean,
    dispatch: ReduxDispatch,
  ) => string | undefined | void
  /**
   * Function to post-process the linking state after it has been created.
   * This can be used to run side-effects and modify the state before it is used by the navigation container.
   * @param state The current navigation state
   * @param dispatch The Redux dispatch function
   * @param storeState A function to get the current Redux store state
   * @returns The modified navigation state
   */
  postProcessLinking?: (
    state: PartialState<NavigationState>,
    dispatch?: ReduxDispatch,
    storeState?: () => RootState,
  ) => PartialState<NavigationState>
  /**
   * Determines whether the module requires authorization to be accessed.
   */
  requiresAuthorization?: boolean
  /**
   * Determines whether the module requires a Firebase token.
   */
  requiresFirebaseToken?: boolean
  userMenuSection?: UserMenuSection
}

/**
 * The server part of a module’s configuration.
 */
export type ModuleServerConfig = {
  description: string
  icon: SvgIconName
  /**
   * The reason why the module is not available in all app versions.
   */
  moduleAppReason: string | null
  moduleButtonLabel: string | null
  moduleFallbackUrl: string | null
  moduleSlug: ModuleSlug
  /**
   * The reason why the module is not available in the current app version.
   */
  releaseAppReason: string | null
  releaseButtonLabel: string | null
  releaseFallbackUrl: string | null
  status: ModuleStatus
  title: string
  version: string
}

export enum ModuleStatus {
  active = 1,
  inactive = 0,
}

export type Module = ModuleServerConfig & ModuleClientConfig
