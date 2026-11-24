import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {MetaDataCard} from './MetaDataCard'
import {InlineLink} from './text/InlineLink'
import {Phrase} from './text/Phrase'

const meta = {
  component: MetaDataCard,
  parameters: {
    controls: {
      exclude: ['actions', 'testID', 'children'],
    },
  },
} satisfies Meta<typeof MetaDataCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    iconName: 'clock',
    title: 'Laadtijd',
    children: <Phrase>2 uur en 30 minuten</Phrase>,
    testID: 'MetaDataCard',
  },
}

export const WithoutIcon: Story = {
  args: {
    title: 'Laadtijd',
    children: <Phrase>2 uur en 30 minuten</Phrase>,
    testID: 'MetaDataCard',
  },
}

export const WithAction: Story = {
  args: {
    title: 'Laadtijd',
    children: <Phrase>2 uur en 30 minuten</Phrase>,
    testID: 'MetaDataCard',
    actions: (
      <InlineLink
        accessibilityLabel="E-mailadres wijzigen"
        accessibilityRole="link"
        onPress={() => {}}
        testID="BoatChargingConfirmSessionEmailAddressNavigationButton"
        variant="internal">
        Wijzigen
      </InlineLink>
    ),
  },
}
