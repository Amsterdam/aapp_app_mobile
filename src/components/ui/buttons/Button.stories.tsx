import {Button} from './Button'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Row} from '@/components/ui/layout/Row'
import pressableArgTypes from '@/storybook/utils/pressable-arg-types'

const meta: Meta<typeof Button> = {
  argTypes: pressableArgTypes,
  component: Button,
  parameters: {
    componentSubtitle: 'Het basis button component',
  },
}

export default meta

type Story<T extends typeof Row | void = void> = StoryObj<typeof Button & T>

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
  },
}

export const Tertiary: Story = {
  args: {
    label: 'Tertiary',
    variant: 'tertiary',
  },
}

export const _Inline: Story<typeof Row> = {
  args: {align: 'start'},
  render: ({align}) => (
    <Row align={align}>
      <Button
        label="Inline button"
        testID="Button"
      />
    </Row>
  ),
}

export const __Alignment: Story<typeof Row> = {
  args: {
    align: 'start',
    gutter: 'md',
  },
  render: ({align, gutter}) => (
    <Row
      align={align}
      gutter={gutter}>
      <Button
        label="First button"
        testID="Button"
      />
      <Button
        label="Second button"
        testID="Button"
        variant="secondary"
      />
      <Button
        label="Third button"
        testID="Button"
        variant="tertiary"
      />
    </Row>
  ),
}

/**
 * Knop met een icoon
 */
export const __hasIcon: Story = {
  args: {
    iconName: 'phone_filled',
    label: 'Bel ons',
  },
  render: args => (
    <Row align="start">
      <Button
        {...args}
        testID="Button"
      />
    </Row>
  ),
}
