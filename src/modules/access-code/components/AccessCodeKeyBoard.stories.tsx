import {AccessCodeType} from '../types'
import {AccessCodeKeyBoard} from './AccessCodeKeyBoard'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: AccessCodeKeyBoard,
  parameters: {
    accessCode: {
      codeLength: 5,
      codeConfirmed: [1, 1, 1, 1, 2],
      codeSet: [1, 1, 1, 1, 2],

      iconName: 'face-id',
      isEnrolled: true,
      useBiometrics: true,
    },
    controls: {
      exclude: ['onPressAuthenticate'],
    },
  },
  args: {},
} satisfies Meta<typeof AccessCodeKeyBoard>

type Story = StoryObj<typeof AccessCodeKeyBoard>

export const Default: Story = {
  args: {
    type: AccessCodeType.codeEntered,
  },
}
