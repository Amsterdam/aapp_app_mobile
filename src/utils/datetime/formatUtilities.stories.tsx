import {ScrollView, StyleSheet, Text, View} from 'react-native'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDate} from '@/utils/datetime/formatDate'
import {formatDateTime} from '@/utils/datetime/formatDateTime'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'
import {formatDayName} from '@/utils/datetime/formatDayName'
import {formatHistoryDateTime} from '@/utils/datetime/formatHistoryDateTime'
import {formatSecondsTimeRangeToDisplay} from '@/utils/datetime/formatSecondsTimeRangeToDisplay'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'
import {formatWeekdayNumberToDisplay} from '@/utils/datetime/formatWeekdayNumberToDisplay'
import {weekDayMapping} from '@/utils/datetime/weekdayToNumber'

type Example = {
  label: string
  result: string
}

type UtilitySection = {
  description: string
  examples: Example[]
  functionName: string
}

const historyExampleHour = 13
const historyExampleMinute = 26
const oneHourThirtyMinutesInSeconds = 5400
const ninetyMinutes = 90
const oneWeekInDays = 7
const timeRangeExampleStart = '2023-10-01T12:00:00'
const timeRangeExampleEnd = '2023-10-01T14:30:00'

const DatetimeFormatUtilitiesDocs = () => {
  const currentDate = dayjs()
  const currentYear = currentDate.year()
  const previousYear = currentYear - 1
  const todayIsoString = currentDate.format('YYYY-MM-DD')
  const yesterdayIsoString = currentDate.subtract(1, 'day').format('YYYY-MM-DD')
  const exampleSections: UtilitySection[] = [
    {
      functionName: 'formatDate',
      description: 'Converts a date-like value to a Dutch calendar date.',
      examples: [
        {
          label: `formatDate('${currentYear}-01-01')`,
          result: formatDate(`${currentYear}-01-01`),
        },
        {
          label: "formatDate('2021-01-01T12:00:00Z')",
          result: formatDate('2021-01-01T12:00:00Z'),
        },
        {
          label: `formatDate('${previousYear}-03-01')`,
          result: formatDate(`${previousYear}-03-01`),
        },
      ],
    },
    {
      functionName: 'formatDateToDisplay',
      description:
        'Formats a date for UI display, optionally replacing today and yesterday with labels.',
      examples: [
        {
          label: `formatDateToDisplay('${currentYear}-01-01')`,
          result: formatDateToDisplay(`${currentYear}-01-01`),
        },
        {
          label: `formatDateToDisplay('${currentYear}-01-01', {showDayOfWeek: true})`,
          result: formatDateToDisplay(`${currentYear}-01-01`, {
            showDayOfWeek: true,
          }),
        },
        {
          label: `formatDateToDisplay('${previousYear}-01-01')`,
          result: formatDateToDisplay(`${previousYear}-01-01`),
        },
        {
          label: `formatDateToDisplay('${previousYear}-01-01', {showDayOfWeek: true})`,
          result: formatDateToDisplay(`${previousYear}-01-01`, {
            showDayOfWeek: true,
          }),
        },
        {
          label: `formatDateToDisplay('${todayIsoString}')`,
          result: formatDateToDisplay(todayIsoString),
        },
        {
          label: `formatDateToDisplay('${todayIsoString}', {todayAsDate: false})`,
          result: formatDateToDisplay(todayIsoString, {todayAsDate: false}),
        },
        {
          label: `formatDateToDisplay('${yesterdayIsoString}')`,
          result: formatDateToDisplay(yesterdayIsoString),
        },
        {
          label: `formatDateToDisplay('${yesterdayIsoString}', {todayAsDate: true, yesterdayAsDate: false})`,
          result: formatDateToDisplay(yesterdayIsoString, {
            todayAsDate: true,
            yesterdayAsDate: false,
          }),
        },
      ],
    },
    {
      functionName: 'formatDateTime',
      description:
        'Converts a date-like value to a Dutch date and time string.',
      examples: [
        {
          label: "formatDateTime('December 17, 1995 03:24:00')",
          result: formatDateTime('December 17, 1995 03:24:00'),
        },
        {
          label: "formatDateTime('2021-01-01T12:00:00Z')",
          result: formatDateTime('2021-01-01T12:00:00Z'),
        },
        {
          label: `formatDateTime('${previousYear}-03-01T09:15:00')`,
          result: formatDateTime(`${previousYear}-03-01T09:15:00`),
        },
      ],
    },
    {
      functionName: 'formatDateTimeToDisplay',
      description:
        'Formats a date-time for UI display with optional current-day labeling.',
      examples: [
        {
          label: "formatDateTimeToDisplay('2026-06-29T12:01:00')",
          result: formatDateTimeToDisplay('2026-06-29T12:01:00'),
        },
        {
          label: `formatDateTimeToDisplay('${previousYear}-06-29T12:01:00')`,
          result: formatDateTimeToDisplay(`${previousYear}-06-29T12:01:00`),
        },
        {
          label:
            "formatDateTimeToDisplay('2026-06-29T12:01:00', false, '2026-06-29T00:00:00')",
          result: formatDateTimeToDisplay(
            '2026-06-29T12:01:00',
            false,
            dayjs('2026-06-29T00:00:00'),
          ),
        },
      ],
    },
    {
      functionName: 'formatDayName',
      description:
        'Returns a weekday name and maps tomorrow to a localized label.',
      examples: [
        {
          label: "formatDayName(dayjs('2026-07-31'), dayjs('2026-07-30'))",
          result: formatDayName(dayjs('2026-07-31'), dayjs('2026-07-30')),
        },
        {
          label: "formatDayName(dayjs('2026-08-01'), dayjs('2026-07-30'))",
          result: formatDayName(dayjs('2026-08-01'), dayjs('2026-07-30')),
        },
      ],
    },
    {
      functionName: 'formatHistoryDateTime',
      description:
        'Formats historic timestamps relative to now for activity-style UIs.',
      examples: [
        {
          label: `formatHistoryDateTime(dayjs().set('hour', ${historyExampleHour}).set('minute', ${historyExampleMinute}))`,
          result: formatHistoryDateTime(
            dayjs()
              .set('hour', historyExampleHour)
              .set('minute', historyExampleMinute),
          ),
        },
        {
          label: "formatHistoryDateTime(dayjs().subtract(1, 'day'))",
          result: formatHistoryDateTime(dayjs().subtract(1, 'day')),
        },
        {
          label: "formatHistoryDateTime(dayjs().subtract(7, 'day'))",
          result: formatHistoryDateTime(dayjs().subtract(oneWeekInDays, 'day')),
        },
      ],
    },
    {
      functionName: 'formatSecondsTimeRangeToDisplay',
      description:
        'Formats a duration in seconds by comparing now to now plus the given seconds.',
      examples: [
        {
          label: 'formatSecondsTimeRangeToDisplay(5400)',
          result: formatSecondsTimeRangeToDisplay(
            oneHourThirtyMinutesInSeconds,
          ),
        },
        {
          label: "formatSecondsTimeRangeToDisplay(5400, {format: 'short'})",
          result: formatSecondsTimeRangeToDisplay(
            oneHourThirtyMinutesInSeconds,
            {
              format: 'short',
            },
          ),
        },
        {
          label: "formatSecondsTimeRangeToDisplay(5400, {format: 'veryShort'})",
          result: formatSecondsTimeRangeToDisplay(
            oneHourThirtyMinutesInSeconds,
            {
              format: 'veryShort',
            },
          ),
        },
      ],
    },
    {
      functionName: 'formatTimeDurationToDisplay',
      description:
        'Formats a duration described as a numeric value plus a Day.js unit.',
      examples: [
        {
          label: "formatTimeDurationToDisplay(90, 'minute')",
          result: formatTimeDurationToDisplay(ninetyMinutes, 'minute'),
        },
        {
          label: "formatTimeDurationToDisplay(90, 'minute', {format: 'short'})",
          result: formatTimeDurationToDisplay(ninetyMinutes, 'minute', {
            format: 'short',
          }),
        },
        {
          label:
            "formatTimeDurationToDisplay(90, 'minute', {format: 'veryShort'})",
          result: formatTimeDurationToDisplay(ninetyMinutes, 'minute', {
            format: 'veryShort',
          }),
        },
      ],
    },
    {
      functionName: 'formatTimeRangeToDisplay',
      description: 'Formats a signed time difference between two timestamps.',
      examples: [
        {
          label:
            "formatTimeRangeToDisplay('2023-10-01T12:00:00', '2023-10-01T14:30:00')",
          result: formatTimeRangeToDisplay(
            timeRangeExampleStart,
            timeRangeExampleEnd,
          ),
        },
        {
          label:
            "formatTimeRangeToDisplay('2023-10-01T12:00:00', '2023-10-01T14:30:00', {format: 'veryShort'})",
          result: formatTimeRangeToDisplay(
            timeRangeExampleStart,
            timeRangeExampleEnd,
            {format: 'veryShort'},
          ),
        },
        {
          label:
            "formatTimeRangeToDisplay('2023-10-01T14:30:00', '2023-10-01T12:00:00')",
          result: formatTimeRangeToDisplay(
            timeRangeExampleEnd,
            timeRangeExampleStart,
          ),
        },
        {
          label:
            "formatTimeRangeToDisplay('2023-10-01T14:32:17', '2023-10-01T12:00:00', {smallestUnit: 'seconds'})",
          result: formatTimeRangeToDisplay(
            '2023-10-01T14:32:17',
            timeRangeExampleStart,
            {smallestUnit: 'seconds'},
          ),
        },
      ],
    },
    {
      functionName: 'formatTimeToDisplay',
      description:
        'Formats a timestamp or plain time into HH.mm, with optional hour labels.',
      examples: [
        {
          label: "formatTimeToDisplay('12:00:00')",
          result: formatTimeToDisplay('12:00:00'),
        },
        {
          label:
            "formatTimeToDisplay('12:00:00', {includeHoursLabel: true, hoursLabelShort: false})",
          result: formatTimeToDisplay('12:00:00', {
            includeHoursLabel: true,
            hoursLabelShort: false,
          }),
        },
        {
          label:
            "formatTimeToDisplay('12:00:00', {includeHoursLabel: true, hoursLabelShort: true})",
          result: formatTimeToDisplay('12:00:00', {
            includeHoursLabel: true,
            hoursLabelShort: true,
          }),
        },
        {
          label: "formatTimeToDisplay('00:00:00')",
          result: formatTimeToDisplay('00:00:00'),
        },
        {
          label: "formatTimeToDisplay('00:00:00', {replaceMidnightBy24: true})",
          result: formatTimeToDisplay('00:00:00', {replaceMidnightBy24: true}),
        },
      ],
    },
    {
      functionName: 'formatWeekdayNumberToDisplay',
      description:
        'Formats weekday number selections into Dutch day labels or ranges.',
      examples: [
        {
          label:
            'formatWeekdayNumberToDisplay([weekDayMapping.maandag, weekDayMapping.dinsdag, weekDayMapping.woensdag])',
          result: formatWeekdayNumberToDisplay([
            weekDayMapping.maandag,
            weekDayMapping.dinsdag,
            weekDayMapping.woensdag,
          ]),
        },
        {
          label:
            'formatWeekdayNumberToDisplay([weekDayMapping.zaterdag, weekDayMapping.zondag])',
          result: formatWeekdayNumberToDisplay([
            weekDayMapping.zaterdag,
            weekDayMapping.zondag,
          ]),
        },
        {
          label:
            'formatWeekdayNumberToDisplay([weekDayMapping.maandag, weekDayMapping.woensdag, weekDayMapping.vrijdag])',
          result: formatWeekdayNumberToDisplay([
            weekDayMapping.maandag,
            weekDayMapping.woensdag,
            weekDayMapping.vrijdag,
          ]),
        },
      ],
    },
  ]

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.heroSection}>
        <Text style={styles.eyebrow}>src/utils/datetime</Text>
        <Text style={styles.title}>Format Utility Reference</Text>
        <Text style={styles.summary}>
          One Storybook page with example inputs and live outputs for every
          formatting helper in this folder.
        </Text>
      </View>

      {exampleSections.map(section => (
        <View
          key={section.functionName}
          style={styles.sectionCard}>
          <Text style={styles.functionName}>{section.functionName}</Text>
          <Text style={styles.description}>{section.description}</Text>

          {section.examples.map(example => (
            <View
              key={example.label}
              style={styles.exampleRow}>
              <Text
                selectable
                style={styles.exampleLabel}>
                {example.label}
              </Text>
              <Text
                selectable
                style={styles.exampleResult}>
                {example.result || '""'}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  )
}

const meta: Meta<typeof DatetimeFormatUtilitiesDocs> = {
  component: DatetimeFormatUtilitiesDocs,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof DatetimeFormatUtilitiesDocs>

export const Overview: Story = {
  render: () => <DatetimeFormatUtilitiesDocs />,
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#f6f1e8',
    padding: 24,
    rowGap: 16,
  },
  heroSection: {
    backgroundColor: '#13293d',
    borderRadius: 24,
    padding: 24,
    rowGap: 8,
  },
  eyebrow: {
    color: '#f7b267',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  summary: {
    color: '#d9e2ec',
    fontSize: 16,
    lineHeight: 24,
  },
  sectionCard: {
    backgroundColor: '#fffdf9',
    borderColor: '#d6c7b5',
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    rowGap: 12,
  },
  functionName: {
    color: '#102a43',
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    color: '#486581',
    fontSize: 15,
    lineHeight: 22,
  },
  exampleRow: {
    backgroundColor: '#f9f5ef',
    borderRadius: 14,
    padding: 14,
    rowGap: 8,
  },
  exampleLabel: {
    color: '#243b53',
    fontFamily: 'Courier',
    fontSize: 13,
    lineHeight: 18,
  },
  exampleResult: {
    color: '#7c2d12',
    fontSize: 16,
    fontWeight: '600',
  },
})
