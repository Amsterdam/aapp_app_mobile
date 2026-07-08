import {useMemo} from 'react'
import {useFormContext} from 'react-hook-form'
import {FlatList} from 'react-native'
import type {PrideEventFormValues} from '@/modules/pride/types'
import {ContentButton} from '@/components/ui/buttons/ContentButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {
  ALL_TYPES_LABEL,
  ALL_DATES_LABEL,
  TODAY_LABEL,
  TOMORROW_LABEL,
  CHOOSE_DATE_LABEL,
  THIS_WEEKEND_LABEL,
} from '@/modules/pride/constants'
import {usePrideEventsQuery} from '@/modules/pride/service'
import {eventIsOnDay} from '@/modules/pride/utils/eventIsOnDay'
import {eventIsThisWeekend} from '@/modules/pride/utils/eventIsThisWeekend'
import {formatMeta} from '@/modules/pride/utils/formatMeta'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

export const PrideEventsList = () => {
  const {watch} = useFormContext<PrideEventFormValues>()
  const {data, isLoading, isError} = usePrideEventsQuery()
  const selectedType = watch('type')
  const selectedDate = watch('date')
  const customDate = watch('customDate')
  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    const today = dayjs().set('hour', 5)

    return data.filter(event => {
      const matchesType =
        selectedType === ALL_TYPES_LABEL || event.type === selectedType
      const matchesDate =
        selectedDate === ALL_DATES_LABEL ||
        (selectedDate === TODAY_LABEL && eventIsOnDay(today, event)) ||
        (selectedDate === TOMORROW_LABEL &&
          eventIsOnDay(today.add(1, 'day'), event)) ||
        (selectedDate === THIS_WEEKEND_LABEL && eventIsThisWeekend(event)) ||
        (selectedDate === CHOOSE_DATE_LABEL &&
          eventIsOnDay(dayjs(customDate).set('hour', 5), event))

      return matchesType && matchesDate
    })
  }, [data, selectedType, selectedDate, customDate])

  return (
    <>
      <Box>
        <Row gutter="smd">
          <SelectButtonControlled<PrideEventFormValues, 'type'>
            bottomSheetVariant="type"
            name="type"
            testID="PrideEventTypeSelectButton"
            title={value =>
              value.length > 12 ? `${value.slice(0, 12)}...` : value
            }
          />
          <SelectButtonControlled<PrideEventFormValues, 'date'>
            bottomSheetVariant="date"
            name="date"
            testID="PrideEventDateSelectButton"
            title={value =>
              value === CHOOSE_DATE_LABEL
                ? `${formatDateToDisplay(customDate)}`
                : value
            }
          />
        </Row>
      </Box>
      <FlatList
        data={filteredData}
        ItemSeparatorComponent={<Gutter height="md" />}
        ListEmptyComponent={
          isLoading ? (
            <PleaseWait testID="PrideEventsListPleaseWait" />
          ) : isError ? (
            <SomethingWentWrong testID="PrideEventsListSomethingWentWrong" />
          ) : undefined
        }
        ListFooterComponent={<Gutter height="xl" />}
        renderItem={({item}) => (
          <ContentButton
            icon={{name: 'calendar', color: 'cityPass'}}
            imageBackgroundColor="pride"
            meta={formatMeta(item)}
            onPress={() => null}
            testID={`PrideEvent${item.id}Button`}
            title={item.title}
            titleColor="cityPass"
          />
        )}
      />
    </>
  )
}
