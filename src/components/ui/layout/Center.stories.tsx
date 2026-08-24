import {Meta, StoryFn} from '@storybook/react-native-web-vite'
import {Center} from '@/components/ui/layout/Center'
import {Phrase} from '@/components/ui/text/Phrase'
import {Canvas} from '@/storybook/components'

export default {
  component: Center,
  decorators: [
    Story => (
      <Canvas
        height="256px"
        highlight
        maxWidth="512px">
        <Story />
      </Canvas>
    ),
  ],
} satisfies Meta<typeof Center>

export const Default: StoryFn<typeof Center> = args => (
  <Center {...args}>
    <Phrase testID="Phrase">Ik sta in het midden</Phrase>
  </Center>
)

Default.args = {
  grow: true,
}
