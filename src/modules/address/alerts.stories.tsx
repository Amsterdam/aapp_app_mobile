import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {renderAlerts} from '@/storybook/utils/renderAlerts'
import {alerts} from './alerts'

export default {
  component: AlertBase,
  parameters: {
    controls: {disable: true},
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof AlertBase>

export const All: StoryObj<typeof AlertBase> = {
  render: () => renderAlerts(alerts),
}

export const Failed: StoryObj<typeof AlertBase> = {
  render: () => renderAlerts(alerts, AlertVariant.negative),
}

export const Success: StoryObj<typeof AlertBase> = {
  render: () => renderAlerts(alerts, AlertVariant.positive),
}

export const Information: StoryObj<typeof AlertBase> = {
  render: () => renderAlerts(alerts, AlertVariant.information),
}

export const Warning: StoryObj<typeof AlertBase> = {
  render: () => renderAlerts(alerts, AlertVariant.warning),
}
