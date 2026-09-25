import {StyleSheet, View} from 'react-native'
import {ProgressStep} from './ProgressStep'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {Canvas} from '@/storybook/components'

const meta = {
  component: ProgressStep,
  tags: ['!autodocs'],
  decorators: [
    Story => (
      <Canvas
        highlight
        maxWidth="480px">
        <View style={styles.storyContainer}>{Story()}</View>
      </Canvas>
    ),
  ],
  argTypes: {
    accessible: {
      control: 'boolean',
    },
    children: {
      control: false,
      table: {disable: true},
    },
    isExpanded: {
      control: 'boolean',
    },
    numberIndicator: {
      control: {type: 'number'},
    },
    progressStatus: {
      control: {type: 'select'},
      options: ['active', 'planned', 'done'],
    },
    progressStatusNextItem: {
      control: {type: 'select'},
      options: ['active', 'planned', 'done', undefined],
    },
    testID: {
      control: false,
      table: {disable: true},
    },
    variant: {
      control: {type: 'select'},
      options: ['primary', 'secondary'],
    },
  },
  args: {
    children: (
      <Column
        gutter="xs"
        shrink={1}>
        <Title
          level="h4"
          text="Step title"
        />
        <Paragraph>
          Brief guidance that helps people understand what happens in this step.
        </Paragraph>
      </Column>
    ),
    progressStatus: 'active',
    progressStatusNextItem: 'planned',
    variant: 'secondary',
    numberIndicator: 2,
  },
} satisfies Meta<typeof ProgressStep>

export default meta

type Story = StoryObj<typeof ProgressStep>

export const CurrentStep: Story = {}

export const CompletedStep: Story = {
  args: {
    progressStatus: 'done',
    progressStatusNextItem: 'done',
  },
}

export const PlannedStep: Story = {
  args: {
    progressStatus: 'planned',
    progressStatusNextItem: 'planned',
    numberIndicator: 3,
  },
}

export const ExpandedTimelineItem: Story = {
  args: {
    children: (
      <Column
        gutter="sm"
        shrink={1}>
        <Title
          level="h4"
          text="Permit review"
        />
        <Paragraph>
          Keep the connector visible while people review the details of the
          current milestone.
        </Paragraph>
        <Paragraph color="secondary">
          Add supporting details only when the expanded content helps someone
          decide what happens next.
        </Paragraph>
      </Column>
    ),
    isExpanded: true,
    progressStatus: 'active',
    progressStatusNextItem: undefined,
    variant: 'primary',
    numberIndicator: undefined,
  },
}

export const LastStep: Story = {
  args: {
    progressStatus: 'done',
    progressStatusNextItem: undefined,
  },
}

const styles = StyleSheet.create({
  storyContainer: {
    minHeight: 220,
    padding: 24,
  },
})
