import type {createStackNavigator} from '@/app/navigation/createStackNavigator'
import type {
  AppStackNavigationOptions,
  RootStackParams,
} from '@/app/navigation/types'
import type {ComponentProps, ReactElement} from 'react'

export enum AccessCodeType {
  codeConfirmed = 'codeConfirmed',
  codeEntered = 'codeEntered',
  codeSet = 'codeSet',
}

export type StackFactory = ReturnType<
  typeof createStackNavigator<RootStackParams>
>

export type StackElement<
  T extends keyof Pick<StackFactory, 'Group' | 'Screen'>,
> = ReactElement<
  Omit<ComponentProps<StackFactory[T]>, 'options'> & {
    options?: AppStackNavigationOptions
  },
  StackFactory[T]
>
