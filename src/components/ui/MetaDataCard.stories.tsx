import {MetaDataCard} from './MetaDataCard'
import {Phrase} from './text/Phrase'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: MetaDataCard,
} satisfies Meta<typeof MetaDataCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    iconName: 'clock',
    title: 'Laadtijd',
    children: <Phrase>2 uur en 30 minuten</Phrase>,
    testID: 'MetaDataCard',
  },
}
