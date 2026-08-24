import {Meta, StoryFn} from '@storybook/react-native-web-vite'
import {Box} from '@/components/ui/containers/Box'
import {Phrase} from '@/components/ui/text/Phrase'
import {baseColor} from '@/themes/tokens/base-color'

export default {
  component: Box,
  args: {
    grow: false,
    inset: 'md',
  },
  parameters: {
    backgrounds: {
      options: {
        default_screen: {
          name: 'Default screen',
          value: baseColor.primary.white,
        },

        settings_screen: {
          name: 'Settings screen',
          value: baseColor.custom.grey0,
        },
      },
    },
  },
} satisfies Meta<typeof Box>

export const Default: StoryFn<typeof Box> = args => (
  <Box {...args}>
    <Phrase testID="Phrase">I’m a box.</Phrase>
  </Box>
)
