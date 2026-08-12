import {Meta, StoryFn} from '@storybook/react-native-web-vite'
import {Link} from './Link'

export default {
  component: Link,
} as Meta<typeof Link>

export const Default: StoryFn<typeof Link> = args => <Link {...args} />
Default.args = {
  label: 'Klik mij ik ben een link',
  variant: 'forward',
}
