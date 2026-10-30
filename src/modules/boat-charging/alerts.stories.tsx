import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {alerts} from './alerts'

export default {
  component: AlertBase,
  parameters: {
    controls: {disable: true},
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof AlertBase>

export const Default: StoryObj<typeof AlertBase> = {
  render: () => (
    <Column gutter="lg">
      {Object.entries(alerts).map(([key, alert]) => (
        <Column
          gutter="sm"
          key={key}>
          <Phrase>{key}</Phrase>
          <AlertBase
            hasCloseIcon
            hasIcon
            {...alert}
          />
        </Column>
      ))}
    </Column>
  ),
}
