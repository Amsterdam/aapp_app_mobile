import {StyleSheet, View} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {WasteGuideCalendarWeekdays} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarWeekdays'
import {WasteGuideCalenderMonth} from '@/modules/waste-guide/components/calendar/WasteGuideCalenderMonth'
import {getCalendarMonths} from '@/modules/waste-guide/components/calendar/utils/getCalendarMonths'

const TOTAL_DAYS = 42 // 6 weeks

export const WasteGuideCalendarGridView = () => {
  const months = getCalendarMonths(TOTAL_DAYS)

  return (
    <View style={styles.container}>
      <WasteGuideCalendarWeekdays />
      <ScrollView>
        <Box
          insetHorizontal="md"
          insetTop="md">
          {Object.entries(months).map(([month, weeks]) => (
            <WasteGuideCalenderMonth
              key={month}
              month={month}
              weeks={weeks}
            />
          ))}
        </Box>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({container: {flex: 1}})
