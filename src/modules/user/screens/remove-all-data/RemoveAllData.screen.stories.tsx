import {UserRouteName} from '../../routes'
import {screenConfig} from '../../screenConfig'
import {RemoveAllDataScreen} from './RemoveAllData.screen'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'

const Stack = createStackNavigator()

const meta = {
  component: RemoveAllDataScreen,
  render: () => (
    <Stack.Navigator>
      <Stack.Screen
        key="removeAllData"
        {...screenConfig[UserRouteName.removeAllData]}
      />
    </Stack.Navigator>
  ),
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RemoveAllDataScreen>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
