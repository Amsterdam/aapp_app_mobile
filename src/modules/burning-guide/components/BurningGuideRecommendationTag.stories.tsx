import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {BurningGuideCodeVariant} from '../types'
import {BurningGuideRecommendationTag} from './BurningGuideRecommendationTag'

const meta = {
  component: BurningGuideRecommendationTag,
} satisfies Meta<typeof BurningGuideRecommendationTag>

export default meta

type Story = StoryObj<typeof meta>

export const CodeRed: Story = {
  args: {
    variant: BurningGuideCodeVariant.red,
  },
}

export const CodeOrange: Story = {
  args: {
    variant: BurningGuideCodeVariant.orange,
  },
}

export const CodeYellow: Story = {
  args: {
    variant: BurningGuideCodeVariant.yellow,
  },
}

export const SmallerFont: Story = {
  args: {
    variant: BurningGuideCodeVariant.red,
    fontSize: 'small',
  },
}
