import {Image} from './Image'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import source from '@/../assets/images/map/distinct_pin.png'

const meta: Meta<typeof Image> = {
  component: Image,
}

export default meta

export const Default: StoryObj<typeof Image> = {
  args: {
    aspectRatio: 'wide',
    source,
  },
}
