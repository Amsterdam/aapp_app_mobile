import {ReactNode} from 'react'
import {Column, type ColumnProps} from '@/components/ui/layout/Column'
import {ListItem} from '@/components/ui/text/list/ListItem'
import {ListMarkerProp} from '@/components/ui/text/list/types'
import {type TestProps} from '@/components/ui/types'

type Props = {
  accessible?: boolean
  gutter?: ColumnProps['gutter']
  items: (string | ReactNode)[]
} & Partial<ListMarkerProp> &
  TestProps

export const List = ({
  items,
  marker = 'square',
  gutter = 'md',
  testID,
  accessible = true,
}: Props) => (
  <Column gutter={gutter}>
    {items.map((text, index) => (
      <ListItem
        accessible={accessible}
        key={typeof text === 'string' ? text : index}
        marker={marker}
        testID={`${testID}${index}Item`}
        text={text}
      />
    ))}
  </Column>
)
