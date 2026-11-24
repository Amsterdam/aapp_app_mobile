import type {ReactNode} from 'react'
import {View} from 'react-native'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import {Title} from '@/components/ui/text/Title'
import type {TestProps} from '@/components/ui/types'
import {capitalizeString} from '@/utils/transform/capitalizeString'

type Props = {
  /**
   * Pass action based children to this prop instead of to the `children` prop, to preserve screen reader reachability.
   * **Action components will be rendered below the regular children**
   */
  actions?: ReactNode
  /**
   * Only for descriptive content (text). For anything action-based, use the `actions` prop.
   */
  children?: ReactNode
  iconName?: SvgIconName
  title: string
} & TestProps

export const MetaDataCard = ({
  children,
  actions,
  iconName,
  testID,
  title,
}: Props) => (
  <View testID={testID}>
    <Row
      gutter="sm"
      valign="start">
      {!!iconName && (
        <Icon
          name={iconName}
          size="lg"
          testID={`${testID}${capitalizeString(iconName)}Icon`}
        />
      )}
      <Column
        flex={1}
        gutter="xxs"
        halign="start">
        <SingleSelectable>
          <Title
            accessible={false}
            level="h5"
            text={title}
          />
          {children}
        </SingleSelectable>
        {actions}
      </Column>
    </Row>
  </View>
)
