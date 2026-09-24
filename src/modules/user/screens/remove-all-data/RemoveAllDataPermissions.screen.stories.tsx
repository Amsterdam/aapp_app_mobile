import {useEffect} from 'react'
import {UserRouteName} from '../../routes'
import {screenConfig} from '../../screenConfig'
import {RemoveAllDataPermissionsScreen} from './RemoveAllDataPermissions.screen'
import type {MetaArgs} from '@/storybook/types'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {setPermission} from '@/store/slices/permissions'
import {Permissions} from '@/types/permissions'

const Stack = createStackNavigator()

type Args = {granted: boolean}

const meta = {
  component: RemoveAllDataPermissionsScreen,
  render: ({granted}) => {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(setPermission({granted, permission: Permissions.notifications}))
    }, [granted, dispatch])

    return (
      <Stack.Navigator>
        <Stack.Screen
          key="removeAllDataPermissions"
          {...screenConfig[UserRouteName.removeAllDataPermissions]}
        />
      </Stack.Navigator>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<MetaArgs<Args>>

export default meta

type Story = StoryObj<typeof meta>

export const PermissionGranted: Story = {
  args: {
    granted: true,
  },
}
export const PermissionDenied: Story = {
  args: {
    granted: false,
  },
}
