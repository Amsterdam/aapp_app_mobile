import {useFormContext} from 'react-hook-form'
import {StyleSheet} from 'react-native'
import DatePicker from 'react-native-date-picker'
import type {PrideEventFormValues} from '@/modules/pride/types'
import {BottomSheetCloseButton} from '@/components/features/bottom-sheet/BottomSheetCloseButton'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {RadioGroupControlled} from '@/components/ui/forms/RadioGroupControlled'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {
  ALL_DATES_LABEL,
  CHOOSE_DATE_LABEL,
  THIS_WEEKEND_LABEL,
  TODAY_LABEL,
  TOMORROW_LABEL,
} from '@/modules/pride/constants'
import {usePrideEventsQuery} from '@/modules/pride/service'
import {dayjs, dayjsFromUnix} from '@/utils/datetime/dayjs'

const options = [
  {label: ALL_DATES_LABEL, value: ALL_DATES_LABEL},
  {label: TODAY_LABEL, value: TODAY_LABEL},
  {label: TOMORROW_LABEL, value: TOMORROW_LABEL},
  {label: THIS_WEEKEND_LABEL, value: THIS_WEEKEND_LABEL},
  {label: CHOOSE_DATE_LABEL, value: CHOOSE_DATE_LABEL},
]

export const PrideEventDateBottomSheet = () => {
  const {data, isLoading} = usePrideEventsQuery()
  const dates = Array.from(
    new Set(data?.flatMap(event => [event.date_start, event.date_end]) ?? []),
  )
    .filter(Boolean)
    .map(date => dayjs(date).unix()) ?? [dayjs().unix()]
  const firstDate = dayjsFromUnix(Math.min(...dates))
  const lastDate = dayjsFromUnix(Math.max(...dates))
  const {watch, setValue} = useFormContext<PrideEventFormValues>()
  const selectedDate = watch('date')
  const customDate = watch('customDate')

  const {close} = useBottomSheet()

  return (
    <Box>
      <Column gutter="md">
        <Row>
          <Title
            level="h5"
            text="Kies een datum"
            textAlign="center"
          />
          <BottomSheetCloseButton testID="PrideEventDateBottomSheetCloseButton" />
        </Row>
        <RadioGroupControlled
          name="date"
          options={options}
          testID="PrideEventDateBottomSheet"
        />
        {selectedDate === CHOOSE_DATE_LABEL && (
          <DatePicker
            date={customDate.toDate()}
            is24hourSource="locale"
            locale="nl-NL"
            maximumDate={lastDate?.toDate()}
            minimumDate={firstDate.toDate()}
            mode={'date'}
            onDateChange={date => setValue('customDate', dayjs(date))}
            style={styles.centerSelf}
            theme="light"
          />
        )}
        {!!isLoading && (
          <PleaseWait testID="PrideEventDateBottomSheetPleaseWait" />
        )}
        <Button
          label="Gereed"
          onPress={close}
          testID="PrideEventDateBottomSheetButton"
        />
      </Column>
    </Box>
  )
}

const styles = StyleSheet.create({
  centerSelf: {
    alignSelf: 'center',
  },
})
