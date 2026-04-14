import {
  Route,
  // eslint-disable-next-line no-restricted-imports
  type NavigationProp as NavigationPropOriginal,
  type ParamListBase,
  // eslint-disable-next-line no-restricted-imports
  type RouteProp as RoutePropOriginal,
} from '@react-navigation/native'
import {
  type StackNavigationOptions,
  StackNavigationProp as StackNavigationPropOriginal,
} from '@react-navigation/stack'
import {type ComponentType} from 'react'
import {type ModuleSlug} from '@/modules/slugs'
import {type ModuleStackParams, type ModalParams} from '@/modules/stacks'

/** We use these param names exclusively to set a screen's titles: the header title and the title for analytics */
export type TitleParams = {
  screenHeaderTitle: string
  screenTitle?: string
}

export type VariableContentParams = Partial<TitleParams> & {
  id: number
}

type ModuleParams<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = Extract<keyof ParamList, string>,
> = Record<
  ModuleSlug,
  | undefined
  | {screen?: RouteName}
  | {params: ParamList[RouteName]; screen: RouteName}
>

export type RootStackParams = ModuleParams<ModuleStackParams> &
  ModuleStackParams &
  ModalParams

/**
 * NavigationProp is the type of a navigation object as part of NavigationProps or as returned by useNavigation.
 */
export type StackNavigationProp<RouteName extends keyof RootStackParams> =
  StackNavigationPropOriginal<RootStackParams, RouteName>

/**
 * NavigationProp is the type of a navigation object as part of NavigationProps or as returned by useNavigation.
 */
export type NavigationProp<RouteName extends keyof RootStackParams> =
  NavigationPropOriginal<RootStackParams, RouteName>

/**
 * RouteProp is the type of a route object as part of NavigationProps or as returned by useRoute.
 */
export type RouteProp<RouteName extends keyof RootStackParams> =
  RoutePropOriginal<RootStackParams, RouteName>

/**
 * NavigationProps contains a NavigationProp and a RouteProp. This can be used in screen components (i.e. components that receive these props because the are stack screens).
 */
export type NavigationProps<RouteName extends keyof RootStackParams> = {
  navigation: StackNavigationProp<RouteName>
  route: RouteProp<RouteName>
}

export type HeaderContentOptions = {
  SideComponent?: ComponentType<{route: Route<string>}>
  accessibilityLanguage?: string
  preventInitialFocus?: boolean
}

export type StackNavigationRouteConfig<R> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>
  name: keyof R
  options?: StackNavigationOptions & HeaderContentOptions
  screenType?: 'default' | 'settings'
  title?: string
}

export type StackNavigationRoutes<R, Route extends string = string> = Record<
  Route,
  StackNavigationRouteConfig<R>
>

type RouteName = keyof ModuleStackParams
type ParamsOf<Route extends RouteName> = ModuleStackParams[Route]

// Navigate in-Stack: navigate(Route, params?)
export type InStackTo = {
  [Route in RouteName]: ParamsOf<Route> extends undefined
    ? [Route] | [Route, undefined]
    : [Route, ParamsOf<Route>]
}[RouteName]

// Navigate to specific screen cross-Stack: navigate(ModuleSlug, { screen, params? })
export type CrossStackTo = {
  [Route in RouteName]: ParamsOf<Route> extends undefined
    ? [ModuleSlug, {screen: Route}]
    : [ModuleSlug, {params: ParamsOf<Route>; screen: Route}]
}[RouteName]

/**
 * NavigateTo can be used to type the parameters for filling the useNavigation().navigate function
 */
export type NavigateTo = InStackTo | CrossStackTo

export type RoutesAcceptingParams<Params> = {
  [K in keyof ModuleStackParams]-?: Params extends NonNullable<
    ModuleStackParams[K]
  >
    ? NonNullable<ModuleStackParams[K]> extends Params
      ? K
      : never
    : never
}[keyof ModuleStackParams]
