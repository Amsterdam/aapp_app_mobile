import {ContentButton} from './ContentButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {LiveblogTag} from '@/modules/news/components/liveblog/LiveblogTag'
import pressableArgTypes from '@/storybook/utils/pressable-arg-types'

const meta = {
  argTypes: pressableArgTypes,
  component: ContentButton,
  args: {
    title: 'The quick brown fox jumps over the lazy dog',
    meta: 'do 2 okt, 9.00 - 12.30 uur',
    testID: 'ContentButton',
    images: [
      {
        uri: '',
        width: 100,
        height: 80,
      },
    ],
  },
} satisfies Meta<typeof ContentButton>

export default meta

type Story = StoryObj<typeof ContentButton>

export const Default: Story = {
  args: {},
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HUuOrfCRCitJNEJh6bf9Ai/Amsterdam-app---productie?node-id=3138-7007&t=RDRVTfOzgsLOoBY3-4',
    },
  },
}
export const WithTag: Story = {
  args: {
    tag: <LiveblogTag variant="transparent" />,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HUuOrfCRCitJNEJh6bf9Ai/Amsterdam-app---productie?node-id=3138-7007&t=RDRVTfOzgsLOoBY3-4',
    },
  },
}
export const WithIcon: Story = {
  args: {
    images: undefined,
    icon: {
      name: 'calendar',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HUuOrfCRCitJNEJh6bf9Ai/Amsterdam-app---productie?node-id=3138-7007&t=RDRVTfOzgsLOoBY3-4',
    },
  },
}

export const WithColors: Story = {
  args: {
    images: undefined,
    icon: {
      name: 'calendar',
      color: 'cityPass',
    },
    imageBackgroundColor: 'pride',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HUuOrfCRCitJNEJh6bf9Ai/Amsterdam-app---productie?node-id=3138-7007&t=RDRVTfOzgsLOoBY3-4',
    },
  },
}
