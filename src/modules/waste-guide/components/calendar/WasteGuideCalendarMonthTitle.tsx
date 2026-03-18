import {View} from 'react-native'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {capitalizeString} from '@/utils/transform/capitalizeString'

type Props = {
  monthName: string
}

export const WasteGuideCalendarMonthTitle = ({monthName}: Props) => (
  <View>
    <Title
      level="h5"
      text={capitalizeString(monthName)}
    />
    <Gutter height="sm" />
  </View>
)
