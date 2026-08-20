import {Meta, StoryFn} from '@storybook/react-native-web-vite'
import {Paragraph} from './Paragraph'

export default {
  component: Paragraph,
} satisfies Meta<typeof Paragraph>

export const Default: StoryFn<typeof Paragraph> = args => (
  <Paragraph {...args}>
    Jouw typograaf biedt mij zulke exquise schreven!
  </Paragraph>
)
Default.args = {
  color: 'default',
  variant: 'body',
}
