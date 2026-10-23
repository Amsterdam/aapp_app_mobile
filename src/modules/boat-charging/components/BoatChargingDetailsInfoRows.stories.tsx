import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {BoatChargingDetailsInfoRows} from './BoatChargingDetailsInfoRows'

const meta = {
  component: BoatChargingDetailsInfoRows,
  parameters: {
    controls: {
      exclude: ['rows'],
      disable: true,
    },
  },
} satisfies Meta<typeof BoatChargingDetailsInfoRows>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rows: [
      ['Adres', 'Amstel 1, Amsterdam'],
      ['Vermogen', '11.7 kW'],
      [
        'Starttarief',
        new Intl.NumberFormat('nl-NL', {
          style: 'currency',
          currency: 'EUR',
        }).format(1.21),
      ],

      ['Toegankelijkheid', undefined],
    ],
  },
}
