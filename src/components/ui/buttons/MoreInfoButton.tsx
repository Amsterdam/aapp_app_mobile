import {Pressable, type PressableProps} from '@/components/ui/buttons/Pressable'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'

type Props = {
  text: string
} & Omit<PressableProps, 'children'> &
  TestProps

export const MoreInfoButton = ({
  onPress,
  testID,
  text,
  ...pressableProps
}: Props) => (
  <Pressable
    hitSlop={8}
    onPress={onPress}
    {...pressableProps}
    testID={`${testID}MoreInfoButton`}>
    <Row
      gutter="sm"
      valign="center">
      <Phrase color="link">{text}</Phrase>
      <Icon
        color="link"
        name="chevron-down"
      />
    </Row>
  </Pressable>
)
