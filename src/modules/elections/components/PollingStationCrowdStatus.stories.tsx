import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import type {PollingStation} from '../types'
import {PollingStationCrowdStatus} from './PollingStationCrowdStatus'

const meta = {
  component: PollingStationCrowdStatus,
} satisfies Meta<typeof PollingStationCrowdStatus>

export default meta

type Story = StoryObj<typeof meta>

export const Rustig: Story = {
  args: {
    pollingStation: {
      lastUpdate: {state: 1, time: '1761736545'},
    } as PollingStation,
  },
}
export const Gemiddeld: Story = {
  args: {
    pollingStation: {
      lastUpdate: {state: 2, time: '1761736545'},
    } as PollingStation,
  },
}
export const Druk: Story = {
  args: {
    pollingStation: {
      lastUpdate: {state: 3, time: '1761736545'},
    } as PollingStation,
  },
}
export const NietBeschikbaar: Story = {
  args: {
    pollingStation: {
      lastUpdate: {state: 0, time: null},
    } as PollingStation,
  },
}
