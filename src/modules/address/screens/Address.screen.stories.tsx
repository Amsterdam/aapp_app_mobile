import {View} from 'react-native'
import {AddressScreen} from './Address.screen'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'

const Stack = createStackNavigator()

const meta = {
  component: AddressScreen,
  render: () => (
    <View style={{height: '100%'}}>
      <Stack.Navigator>
        <Stack.Screen
          component={AddressScreen}
          key="address"
          name="address"
          options={{}}
        />
      </Stack.Navigator>
    </View>
  ),
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AddressScreen>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
