import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import HouseholdWasteToContainerImage from '@/modules/waste-guide/assets/images/household-waste-to-container.svg'
import {Figure} from './Figure'

const meta = {
  component: Figure,
} satisfies Meta<typeof Figure>

export default meta

export const Default: StoryObj<typeof Figure> = {
  args: {
    aspectRatio: 'wide',
    children: <HouseholdWasteToContainerImage />,
    height: 256,
  },
}
