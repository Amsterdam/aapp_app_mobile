import {Row} from '../layout/Row'
import {Phrase} from './Phrase'
import {Tag} from './Tag'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {LiveblogDot} from '@/modules/news/components/liveblog/LiveblogDot'

const meta: Meta<typeof Tag> = {
  component: Tag,
}

export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    label: 'Default',
  },
}

export const Small: Story = {
  args: {
    label: 'Small',
    paddingVertical: 'no',
  },
}

export const Warning: Story = {
  args: {
    label: 'Warning',
    variant: 'warning',
  },
}

export const Node: Story = {
  args: {
    paddingVertical: 'no',
    children: (
      <Row gutter="sm">
        <LiveblogDot />
        <Phrase
          color="warning"
          emphasis="strong"
          variant="small">
          Liveblog
        </Phrase>
      </Row>
    ),
  },
}
