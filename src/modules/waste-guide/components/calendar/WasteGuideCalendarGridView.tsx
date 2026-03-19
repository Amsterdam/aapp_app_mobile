import {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import type {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'
import {Box} from '@/components/ui/containers/Box'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {WasteGuideCalendarMonth} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarMonth'
import {WasteGuideCalendarWeekdays} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarWeekdays'
import {getFormattedCalendar} from '@/modules/waste-guide/components/calendar/utils/getFormattedCalendar'
import {CalendarProvider} from '@/modules/waste-guide/providers/CalendarProvider'

const TOTAL_WEEKS = 6

type Props = {
  calendar: WasteGuideCalendarEvent[]
}

export const WasteGuideCalendarGridView = ({calendar}: Props) => {
  const formattedCalendar = useMemo(
    () => getFormattedCalendar(TOTAL_WEEKS * 7),
    [],
  )

  return (
    <CalendarProvider calendar={calendar}>
      <View style={styles.container}>
        <WasteGuideCalendarWeekdays />
        <ScrollView>
          <Box
            insetHorizontal="md"
            insetTop="md">
            {Object.entries(formattedCalendar).map(([_, months]) =>
              Object.entries(months).map(([month, weeks]) => (
                <WasteGuideCalendarMonth
                  key={month}
                  month={month}
                  weeks={weeks}
                />
              )),
            )}
          </Box>
        </ScrollView>
      </View>
    </CalendarProvider>
  )
}

const styles = StyleSheet.create({container: {flex: 1}})
