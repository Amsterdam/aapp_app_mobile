import {FC} from 'react'
import {ParkingSessionAddLicensePlateName} from './ParkingSessionAddLicensePlateName'
import {ParkingSessionLicensePlateFormProvider} from './ParkingSessionLicensePlateFormProvider'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Column} from '@/components/ui/layout/Column'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'
import {licensePlatesMock} from '@/modules/parking/mocks/licensePlates.mock'

const maximumLicensePlates = Array.from(
  {length: MAX_LICENSE_PLATES},
  (_, index) => ({
    id: String(index + 1),
    vehicle_id: `CAR${index + 1}`,
    visitor_name: `Bezoeker ${index + 1}`,
  }),
)

type FormDecoratorProps = {
  children: React.ReactNode
  defaultValues?: React.ComponentProps<
    typeof ParkingSessionLicensePlateFormProvider
  >['defaultValues']
}

const FormDecorator = ({children, defaultValues}: FormDecoratorProps) => (
  <ParkingSessionLicensePlateFormProvider defaultValues={defaultValues}>
    {children}
  </ParkingSessionLicensePlateFormProvider>
)

const meta = {
  component: ParkingSessionAddLicensePlateName,
  decorators: [
    (Story: FC) => (
      <FormDecorator>
        <Story />
      </FormDecorator>
    ),
  ],
  tags: ['!autodocs'],
} satisfies Meta<typeof ParkingSessionAddLicensePlateName>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    licensePlates: licensePlatesMock,
  },
}

export const ExistingSavedPlate: Story = {
  args: {
    licensePlates: licensePlatesMock,
  },
  decorators: [
    (Story: FC) => (
      <Column gutter="md">
        <FormDecorator
          defaultValues={{vehicle_id: licensePlatesMock[0].vehicle_id}}>
          <Story />
        </FormDecorator>
      </Column>
    ),
  ],
}

export const MaximumReached: Story = {
  args: {
    licensePlates: maximumLicensePlates,
  },
}
