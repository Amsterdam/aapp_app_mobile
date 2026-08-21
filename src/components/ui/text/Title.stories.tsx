import {Meta, StoryFn} from '@storybook/react-native-web-vite'
import {Title} from './Title'

export default {
  component: Title,
} satisfies Meta<typeof Title>

export const Default: StoryFn<typeof Title> = args => <Title {...args} />
Default.args = {
  color: 'default',
  level: 'h1',
  text: 'Jouw typograaf biedt mij zulke exquise schreven!',
}
