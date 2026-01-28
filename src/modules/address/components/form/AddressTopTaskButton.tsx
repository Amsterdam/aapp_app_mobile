import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {type LogProps} from '@/processes/piwik/types'

type Props = {
  hasTitleIcon?: boolean
  onPress: () => void
  text: string
} & TestProps &
  LogProps

export const AddressTopTaskButton = ({
  hasTitleIcon,
  onPress,
  testID,
  text,
  ...props
}: Props) => (
  <TopTaskButton
    flex={1}
    iconName="house"
    iconSize="lg"
    insetHorizontal="sm"
    onPress={onPress}
    testID={testID}
    text={text}
    title="Mijn adres"
    titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    {...props}
  />
)
