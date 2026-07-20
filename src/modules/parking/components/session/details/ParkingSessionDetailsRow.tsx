import {type PropsWithChildren} from 'react'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import type {TestProps} from '@/components/ui/types'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {capitalizeString} from '@/utils/transform/capitalizeString'

export const ParkingSessionDetailsRow = ({
  children,
  iconName,
  testID,
  title,
}: PropsWithChildren<
  {
    iconName: SvgIconName
    title: string
  } & TestProps
>) => (
  <SingleSelectable testID={testID}>
    <Row
      gutter="sm"
      valign="start">
      <Icon
        name={iconName}
        size="lg"
        testID={`ParkingSessionDetails${capitalizeString(iconName)}Icon`}
      />
      <Column
        gutter="xxs"
        halign="start"
        shrink={1}>
        <Title
          accessible={false}
          level="h5"
          text={title}
        />
        {children}
      </Column>
    </Row>
  </SingleSelectable>
)
