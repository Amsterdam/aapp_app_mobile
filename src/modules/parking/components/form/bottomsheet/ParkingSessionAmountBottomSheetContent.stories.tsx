import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {FormProvider, useForm} from 'react-hook-form'
import type {ParkingIncreaseBalanceFormValues} from '@/modules/parking/screens/ParkingIncreaseBalance.screen'
import {ParkingSessionAmountBottomSheetContent} from './ParkingSessionAmountBottomSheetContent'

const meta = {
  component: ParkingSessionAmountBottomSheetContent,
  decorators: Story => {
    const form = useForm<ParkingIncreaseBalanceFormValues>()

    return (
      <FormProvider {...form}>
        <Story />
      </FormProvider>
    )
  },
  parameters: {
    bottomSheet: {
      isOpen: true,
    },
  },
} satisfies Meta<typeof ParkingSessionAmountBottomSheetContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
