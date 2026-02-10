import {DigiDButton} from './DigiDButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: DigiDButton,
} satisfies Meta<typeof DigiDButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onPress: () => null,
    testID: 'DigiDButton',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/92rtEpZVBUoS03tiAeplZo/Instellingen?node-id=7099-684&t=pSIqpcBDEEAIBCTJ-4',
    },
  },
}
