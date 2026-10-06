import {StyleSheet, View} from 'react-native'
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context'
import {AccessCodeKeyBoardKey} from './AccessCodeKeyBoardKey.tsx'
import type {Theme} from '@/themes/themes'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Box} from '@/components/ui/containers/Box'
import {SvgIconsConfig} from '@/components/ui/media/svgIcons'
import {IconSize} from '@/components/ui/types'
import {sizeTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

export default {
  component: AccessCodeKeyBoardKey,
  argTypes: {
    iconName: {
      options: Object.keys(SvgIconsConfig),
      control: {type: 'select'},
      description:
        'Icon properties that define the icon to render inside the Key',
    },
    iconSize: {
      control: {type: 'select'},
      options: Object.keys(sizeTokens.spacing).filter(icon => icon in IconSize),
    },
  },
  render: args => {
    const insets = useSafeAreaInsets()
    const styles = useThemable(createStyles(insets))

    return (
      <View style={styles.container}>
        <Box>
          <AccessCodeKeyBoardKey {...args} />
        </Box>
      </View>
    )
  },
} satisfies Meta<typeof AccessCodeKeyBoardKey>

const createStyles =
  (insets: EdgeInsets) =>
  ({border, color}: Theme) =>
    StyleSheet.create({
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.customKeyboard.background,
        paddingBottom: insets.bottom,
        borderRadius: border.radius.xs,
      },
    })

type Story = StoryObj<typeof AccessCodeKeyBoardKey>

export const Default: Story = {
  args: {
    keyNumber: 1,
  },
}

export const WithIcon: Story = {
  args: {
    iconName: 'backspace',
    iconSize: 'xl',
  },
}
