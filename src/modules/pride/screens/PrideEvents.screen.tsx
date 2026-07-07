import {FormProvider, useForm} from 'react-hook-form'
import type {PrideEventFormValues} from '@/modules/pride/types'
import {Screen} from '@/components/features/screen/Screen'
import {PrideEventsBottomSheet} from '@/modules/pride/components/PrideEventsBottomSheet'
import {PrideEventsList} from '@/modules/pride/components/PrideEventsList'
import {ALL_TYPES_LABEL, ALL_DATES_LABEL} from '@/modules/pride/constants'
import {dayjs} from '@/utils/datetime/dayjs'

export const PrideEventsScreen = () => {
  const form = useForm<PrideEventFormValues>({
    defaultValues: {
      type: ALL_TYPES_LABEL,
      date: ALL_DATES_LABEL,
      customDate: dayjs(),
    },
  })

  return (
    <FormProvider {...form}>
      <Screen
        bottomSheet={<PrideEventsBottomSheet />}
        scroll={false}
        testID="PrideEventsScreen">
        <PrideEventsList />
      </Screen>
    </FormProvider>
  )
}
