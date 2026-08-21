import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Canvas} from '@/storybook/components'

export default {
  component: PleaseWait,
  decorators: [
    Story => (
      <Canvas
        height="256px"
        highlight
        maxWidth="512px">
        {Story()}
      </Canvas>
    ),
  ],
} satisfies Meta<typeof PleaseWait>

export const Default: StoryObj<typeof PleaseWait> = {
  args: {
    grow: true,
  },
}

export const After5Seconds: StoryObj<typeof PleaseWait> = {
  args: {
    grow: true,
    startedTimeStamp: Date.now() - 5000,
  },
}

export const After15Seconds: StoryObj<typeof PleaseWait> = {
  args: {
    grow: true,
    startedTimeStamp: Date.now() - 15000,
  },
}
