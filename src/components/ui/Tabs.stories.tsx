import {Tabs} from './Tabs'
import {Phrase} from './text/Phrase'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: Tabs,
  render: args => (
    <Tabs {...args}>
      <Tabs.Tab label="Tab 1">
        <Phrase>Content 1</Phrase>
      </Tabs.Tab>
      <Tabs.Tab label="Tab 2">
        <Phrase>Content 2</Phrase>
      </Tabs.Tab>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    testID: 'Tabs',
    children: undefined,
  },
}
