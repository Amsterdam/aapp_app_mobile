import {impactAsync, ImpactFeedbackStyle} from 'expo-haptics'
import {useFormContext, useController} from 'react-hook-form'
import {Platform, StyleSheet, View} from 'react-native'
import type {Dayjs} from '@/utils/datetime/dayjs'
import {Tabs} from '@/components/ui/Tabs'
import {Button} from '@/components/ui/buttons/Button'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {DatePicker} from '@/components/ui/forms/DatePicker'
import {TimeDurationSpinner} from '@/components/ui/forms/TimeDurationSpinner'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Track} from '@/components/ui/layout/Track'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {ParkingPermit} from '@/modules/parking/types'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

type Props = {
  currentPermit: ParkingPermit
  minimumEndTime?: Dayjs
}

type FieldValues = {endTime?: Dayjs; startTime: Dayjs}

export const ParkingSessionDurationTimePicker = ({
  currentPermit,
  minimumEndTime,
}: Props) => {
  const {watch} = useFormContext<FieldValues>()
  const startTime = watch('startTime')
  const {
    field: {value: endTime, onChange},
  } = useController<FieldValues, 'endTime'>({
    name: 'endTime',
  })

  const maximumDateTime =
    currentPermit.max_session_length_in_days === 1
      ? startTime.endOf('day')
      : undefined
  const minimumDateTime = minimumEndTime ?? startTime

  const minHours = minimumDateTime.diff(startTime, 'hour')
  const minMinutes = minimumDateTime.diff(
    startTime.add(minHours, 'hours'),
    'minute',
  )

  const {isPortrait} = useDeviceContext()

  return (
    <Track align="around">
      <Column
        gutter="lg"
        halign="center">
        <SingleSelectable>
          <Title
            level="h1"
            text={formatTimeRangeToDisplay(startTime, endTime ?? startTime)}
            textAlign="center"
          />
          <Title
            level="h5"
            text="Parkeertijd"
            textAlign="center"
          />
        </SingleSelectable>
        <Phrase>
          <Icon
            name="clock"
            size="sm"
            testID="ParkingSessionEndTimeIcon"
          />{' '}
          Eindtijd{' '}
          {formatTimeToDisplay(endTime ?? startTime, {includeHoursLabel: true})}
        </Phrase>
      </Column>
      <Gutter height="lg" />
      <Tabs testID="ParkingSessionDurationTimePickerTabs">
        {!!isPortrait && (
          <Tabs.Tab
            accessibilityLabel="Parkeertijd kiezen"
            label="Parkeertijd">
            <Column halign="center">
              <Gutter height="xl" />
              <TimeDurationSpinner
                initialHours={endTime?.diff(startTime, 'hour') ?? 0}
                initialMinutes={
                  endTime
                    ? endTime.diff(startTime, 'minute') -
                      endTime.diff(startTime, 'hour') * 60
                    : 0
                }
                maxHours={
                  currentPermit.max_session_length_in_days === 1
                    ? startTime.endOf('day').diff(startTime, 'hour')
                    : undefined
                }
                maxMinutes={
                  currentPermit.max_session_length_in_days === 1
                    ? startTime.endOf('day').diff(startTime, 'minutes') -
                      startTime.endOf('day').diff(startTime, 'hour') * 60
                    : undefined
                }
                minHours={minHours}
                minMinutes={minMinutes}
                onChange={(hours, minutes) => {
                  const newEndTime = startTime
                    .add(hours, 'hour')
                    .add(minutes, 'minute')

                  onChange(newEndTime)

                  if (Platform.OS === 'ios') {
                    void impactAsync(ImpactFeedbackStyle.Light)
                  }
                }}
              />
              <View style={styles.floatingButtons}>
                <Gutter height="md" />
                <Row
                  align="between"
                  grow={1}>
                  <Button
                    accessibilityLabel="Verminder parkeertijd met 5 minuten"
                    label="-5 min"
                    onPress={() => {
                      const desiredEndTime = endTime
                        ? endTime.add(-5, 'minute')
                        : undefined

                      const newEndTime =
                        minimumDateTime &&
                        desiredEndTime?.isBefore(minimumDateTime)
                          ? minimumDateTime
                          : desiredEndTime

                      onChange(newEndTime)
                    }}
                    testID="ParkingSessionDurationDecreaseButton"
                    variant="tertiary"
                  />
                  <Button
                    accessibilityLabel="Verleng parkeertijd met 5 minuten"
                    label="+5 min"
                    onPress={() => {
                      const desiredEndTime = endTime
                        ? endTime.add(5, 'minute')
                        : startTime.add(5, 'minute')

                      const newEndTime =
                        maximumDateTime &&
                        desiredEndTime.isAfter(maximumDateTime)
                          ? maximumDateTime
                          : desiredEndTime

                      onChange(newEndTime)
                    }}
                    testID="ParkingSessionDurationIncreaseButton"
                    variant="tertiary"
                  />
                </Row>
              </View>
              <Gutter height="lg" />
            </Column>
          </Tabs.Tab>
        )}
        <Tabs.Tab
          accessibilityLabel="Eindtijd kiezen"
          label="Eindtijd">
          <DatePicker
            date={endTime?.toDate() ?? startTime.toDate()}
            maximumDate={maximumDateTime?.toDate()}
            minimumDate={minimumDateTime.toDate()}
            mode="time"
            onChange={onChange}
            theme="light"
          />
        </Tabs.Tab>
      </Tabs>
    </Track>
  )
}

const styles = StyleSheet.create({
  floatingButtons: {
    position: 'absolute',
    width: '100%',
  },
})
