import {UserRouteName} from '../../routes'
import {screenConfig} from '../../screenConfig'
import {RemoveAllDataResultScreen} from './RemoveAllDataResult.screen'
import type {MetaArgs} from '@/storybook/types'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'

const Stack = createStackNavigator()

type Args = {errors?: string[]; success: boolean} & Parameters<
  typeof RemoveAllDataResultScreen
>[0]

const meta = {
  component: RemoveAllDataResultScreen,
  render: ({errors, success}) => (
    <Stack.Navigator>
      <Stack.Screen
        key="removeAllDataResult"
        {...screenConfig[UserRouteName.removeAllDataResult]}
        initialParams={{errors, success}}
        navigationKey={`${success}${errors?.join(',')}`}
      />
    </Stack.Navigator>
  ),
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<MetaArgs<Args>>

export default meta

type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    success: true,
  } as Args,
}
export const Failure: Story = {
  args: {
    success: false,
    errors: ['Verwijderen van gegevens bij Werkzaamheden'],
  } as Args,
}
