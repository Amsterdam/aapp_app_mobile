import {AddressRouteName} from '../routes'
import {screenConfig} from '../screenConfig'
import {AddressScreen} from './Address.screen'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'

const Stack = createStackNavigator()

const meta = {
  component: AddressScreen,
  render: () => (
    <Stack.Navigator>
      <Stack.Screen
        key="address"
        {...screenConfig[AddressRouteName.address]}
      />
    </Stack.Navigator>
  ),
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AddressScreen>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
