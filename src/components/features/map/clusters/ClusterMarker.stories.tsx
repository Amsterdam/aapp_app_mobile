import {ClusterMarker} from './ClusterMarker'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Row} from '@/components/ui/layout/Row'

const meta = {
  component: ClusterMarker,
} satisfies Meta<typeof ClusterMarker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 12,
  },
}

export const LowCount: Story = {
  args: {
    count: 2,
  },
}

export const HighCount: Story = {
  args: {
    count: 1234,
  },
}

const pie = [
  {color: 'red', percentage: 0.4},
  {color: 'blue', percentage: 0.2},
  {color: 'yellow', percentage: 0.1},
  {color: 'pink', percentage: 0.3},
]

export const Pie = {
  render: () => (
    <Row gutter="md">
      <ClusterMarker
        count={1}
        pie={pie}
      />
      <ClusterMarker
        count={12}
        pie={pie}
      />
      <ClusterMarker
        count={123}
        pie={pie}
      />
      <ClusterMarker
        count={1234}
        pie={pie}
      />
      <ClusterMarker
        count={12345}
        pie={pie}
      />
    </Row>
  ),
}
