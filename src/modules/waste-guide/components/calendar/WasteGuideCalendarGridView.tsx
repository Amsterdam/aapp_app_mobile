import {StyleSheet, View} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {Phrase} from '@/components/ui/text/Phrase'
import {WasteGuideCalendarDay} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDay'
import {WasteGuideCalendarDayEvents} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDayEvents'
import {WasteGuideCalendarDaysRow} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDaysRow'
import {WasteGuideCalendarMonthTitle} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarMonthTitle'
import {WasteGuideCalendarWeekdays} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarWeekdays'
import {getCalendarEventsByDate} from '@/modules/waste-guide/components/calendar/utils/getCalendarEventsByDate'
import {getCalendarWeeks} from '@/modules/waste-guide/components/calendar/utils/getCalendarWeeks'
import {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {isToday} from '@/utils/datetime/isToday'
import {isTomorrow} from '@/utils/datetime/isTomorrow'

type Props = {
  calendar: WasteGuideCalendarEvent[]
}

export const WasteGuideCalendarGridView = ({calendar}: Props) => {
  const weeks = getCalendarWeeks()

  const eventsByDate = getCalendarEventsByDate(calendar)
  const styles = createStyles()

  return (
    <View style={styles.container}>
      <WasteGuideCalendarWeekdays />
      <ScrollView>
        <Box
          insetHorizontal="md"
          insetTop="md">
          {weeks.map((week, weekIdx) => (
            <View key={weekIdx}>
              <WasteGuideCalendarMonthTitle
                isFirstOfMonth={week.isFirstOfMonth}
                monthName={week.monthName}
              />
              <WasteGuideCalendarDaysRow
                isFirstOfMonth={week.isFirstOfMonth}
                isLastOfMonth={week.isLastOfMonth}>
                {week.days.map((day, dayIdx) => {
                  const now = dayjs()
                  const dayIsToday = isToday(day)
                  const dayIsTomorrow = isTomorrow(day)
                  const months = Array.from(
                    new Set(week.days.map(d => d.month())),
                  )

                  const isNewMonth =
                    week.isLastOfMonth && day.month() === months[1]

                  const isPreviousMonth =
                    week.isFirstOfMonth &&
                    months.length > 1 &&
                    day.month() === months[0]

                  const isBeforeToday = day.isBefore(now, 'day')
                  const isAfterPeriod = day
                    .add(1, 'day')
                    .isAfter(now.add(6, 'week'), 'day')
                  const isWeekendDay = day.day() === 6 || day.day() === 0
                  const dayEvents = eventsByDate[day.format('YYYY-MM-DD')] || []
                  const accessibilityLabel = `${day.format('dddd D MMMM')}, ${dayIsToday ? 'vandaag, ' : dayIsTomorrow ? 'morgen, ' : ''}${dayEvents.length > 0 ? dayEvents.map(event => event.label).join(', ') : 'Geen ophaaldag'}`

                  return (
                    <WasteGuideCalendarDay
                      accessibilityLabel={accessibilityLabel}
                      isAfter={isAfterPeriod || isNewMonth}
                      isBeforeToday={isBeforeToday || isPreviousMonth}
                      isFirstWeekOfMonth={week.isFirstOfMonth}
                      isToday={dayIsToday}
                      key={dayIdx}>
                      <Phrase
                        accessible={false}
                        color={isWeekendDay ? 'secondary' : undefined}
                        emphasis={dayIsToday ? 'strong' : undefined}>
                        {day.date()}
                      </Phrase>
                      <WasteGuideCalendarDayEvents dayEvents={dayEvents} />
                    </WasteGuideCalendarDay>
                  )
                })}
              </WasteGuideCalendarDaysRow>
            </View>
          ))}
        </Box>
      </ScrollView>
    </View>
  )
}

const createStyles = () => StyleSheet.create({container: {flex: 1}})
