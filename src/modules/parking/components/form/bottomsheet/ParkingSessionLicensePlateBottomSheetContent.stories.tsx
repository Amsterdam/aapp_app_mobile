import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'
import {permitMock} from '@/modules/parking/mocks/permit.mock'
import {ParkingSessionFormProvider} from '../ParkingSessionFormProvider'
import {ParkingSessionLicensePlateBottomSheetContent} from './ParkingSessionLicensePlateBottomSheetContent'

const maximumLicensePlates = Array.from(
  {length: MAX_LICENSE_PLATES},
  (_, index) => ({
    id: String(index + 1),
    vehicle_id: `CAR${index + 1}`,
    visitor_name: `Bezoeker ${index + 1}`,
  }),
)

const meta = {
  component: ParkingSessionLicensePlateBottomSheetContent,
  decorators: [
    Story => (
      <ParkingSessionFormProvider>
        <Story />
      </ParkingSessionFormProvider>
    ),
  ],
  parameters: {
    bottomSheet: {
      isOpen: true,
    },
  },
} satisfies Meta<typeof ParkingSessionLicensePlateBottomSheetContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  parameters: {
    parking: {
      isLoadingLicensePlates: true,
    },
  },
}

export const NoSavedLicensePlates: Story = {
  parameters: {
    parking: {
      licensePlates: [],
    },
  },
}

export const ForceLicensePlateList: Story = {
  parameters: {
    parking: {
      currentPermit: {
        ...permitMock,
        forced_license_plate_list: true,
      },
    },
  },
}

export const MaximumSavedLicensePlatesAvailable: Story = {
  parameters: {
    parking: {
      licensePlates: maximumLicensePlates,
    },
  },
}
