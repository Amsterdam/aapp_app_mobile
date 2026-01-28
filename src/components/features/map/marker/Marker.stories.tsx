import {Image} from 'react-native'
import {MOCK_MARKER_MAP} from './Marker.stories.mock'
import {MarkerVariant} from './markers.generated'
import type {MarkerProps} from './Marker'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'

const MarkerMock = ({variant = MarkerVariant.pin}: MarkerProps) => (
  <Image
    source={MOCK_MARKER_MAP[variant]}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{width: 40, height: 40}}
  />
)

const BASE_MARKERS = new Set([
  MarkerVariant.pin,
  MarkerVariant.distinctPin,
  MarkerVariant.selectedPin,
])

const meta = {
  component: MarkerMock,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(MarkerVariant),
    },
  },
} satisfies Meta<typeof MarkerMock>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: MarkerVariant.pin,
    coordinate: {
      latitude: 1,
      longitude: 1,
    },
  },
}

export const Selected: Story = {
  args: {
    variant: MarkerVariant.selectedPin,
    coordinate: {
      latitude: 1,
      longitude: 1,
    },
  },
}

export const Distinct: Story = {
  args: {
    variant: MarkerVariant.distinctPin,
    coordinate: {
      latitude: 1,
      longitude: 1,
    },
  },
}

export const Custom = {
  render: () => (
    <Row
      gutter="md"
      wrap>
      {Object.values(MarkerVariant)
        .filter(marker => !BASE_MARKERS.has(marker))
        .map(marker => (
          <Column
            gutter="sm"
            halign="center"
            key={marker}>
            <MarkerMock
              coordinate={{latitude: 1, longitude: 1}}
              variant={marker}
            />
            <Phrase>{marker}</Phrase>
          </Column>
        ))}
    </Row>
  ),
}
