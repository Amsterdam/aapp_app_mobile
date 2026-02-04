import {ReactNode} from 'react'
import {Column, type ColumnProps} from '@/components/ui/layout/Column'
import {ListItem} from '@/components/ui/text/list/ListItem'
import {ListMarkerProp} from '@/components/ui/text/list/types'
import {type TestProps} from '@/components/ui/types'

type Props = {
  accessibilityLanguage?: string
  gutter?: ColumnProps['gutter']
  items: (string | ReactNode)[]
} & Partial<ListMarkerProp> &
  TestProps

export const List = ({
  items,
  marker = 'square',
  gutter = 'md',
  testID,
}: Props) => (
  <Column gutter={gutter}>
    {items.map((text, index) => (
      <ListItem
        key={String(text) + index}
        marker={marker}
        testID={`${testID}${index}Item`}
        text={text}
      />
    ))}
  </Column>
)
