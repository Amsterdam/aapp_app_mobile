import {Image} from './Image'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import source from '@/../ios/AmsterdamApp/Images.xcassets/AppIcon.appiconset/Favicon.png'

const meta = {
  component: Image,
} satisfies Meta<typeof Image>

export default meta

export const Default: StoryObj<typeof Image> = {
  args: {
    aspectRatio: 'wide',
    source,
  },
}
