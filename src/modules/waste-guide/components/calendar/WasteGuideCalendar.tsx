import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {WasteGuideCalendarGridView} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarGridView'
import {WasteGuideCalendarListView} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarListView'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'
import {useCalendarView} from '@/modules/waste-guide/slice'

export const WasteGuideCalendar = () => {
  const {address, getWasteGuideIsError, wasteGuide, isLoading} =
    useGetWasteGuide()
  const {calendarView} = useCalendarView()

  if (!address) {
    return (
      <SomethingWentWrong
        testID="WasteGuideCalendarListViewNoAddressSomethingWentWrong"
        text="Er is geen geldig adres geselecteerd. Ga naar Mijn profiel om een adres toe te voegen."
      />
    )
  }

  if (isLoading) {
    return <PleaseWait testID="WasteGuideCalendarListViewPleaseWait" />
  }

  if (getWasteGuideIsError || !wasteGuide) {
    return (
      <SomethingWentWrong
        testID="WasteGuideCalendarListViewSomethingWentWrong"
        text="Er is iets misgegaan bij het ophalen van de afvalkalender."
      />
    )
  }

  return calendarView === 'list' ? (
    <WasteGuideCalendarListView calendar={wasteGuide.calendar} />
  ) : (
    <WasteGuideCalendarGridView calendar={wasteGuide.calendar} />
  )
}
