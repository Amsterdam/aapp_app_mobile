import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {BurningGuideCodeVariant} from '../types'
import {BurningGuideRecommendation} from './BurningGuideRecommendation'

const meta = {
  component: BurningGuideRecommendation,
} satisfies Meta<typeof BurningGuideRecommendation>

export default meta

type Story = StoryObj<typeof meta>

export const CodeRed: Story = {
  args: {
    recommendation: {
      id: '0',
      isFixed: true,
      timeWindow: 'Dinsdag 16.00 uur',
      variant: BurningGuideCodeVariant.red,
    },
  },
}

export const CodeOrange: Story = {
  args: {
    recommendation: {
      id: '0',
      isFixed: true,
      timeWindow: 'Dinsdag 22.00 uur',
      variant: BurningGuideCodeVariant.orange,
    },
  },
}

export const CodeYellow: Story = {
  args: {
    recommendation: {
      id: '0',
      isFixed: false,
      timeWindow: 'Woensdag 04.00 uur',
      variant: BurningGuideCodeVariant.yellow,
    },
  },
}
