import {View} from 'react-native'
import {Row} from '@/components/ui/layout/Row'
import {Icon, type IconProps} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {dayjsFromUnix} from '@/utils/datetime/dayjs'

type Props = {
  icon: IconProps
  text: string
  timestamp: number
} & TestProps

export const ChatSystemEntry = ({icon, text, testID, timestamp}: Props) => (
  <View accessible>
    <Row
      align="center"
      gutter="sm">
      <Icon
        color="secondary"
        {...icon}
        testID={`${testID}Icon`}
      />
      <Phrase
        color="secondary"
        flexShrink={0}
        testID={`${testID}Phrase`}
        textAlign="center">
        {text} - {dayjsFromUnix(timestamp).format('HH:mm')}
      </Phrase>
    </Row>
  </View>
)
