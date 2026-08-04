import type {TestProps} from '@/components/ui/types'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'

type Props = {
  text?: string
  title?: string
} & TestProps

export const EmptyList = ({text, title = 'Geen resultaat', testID}: Props) => (
  <Center grow>
    <Column gutter="xs">
      <Title
        level="h4"
        shrink={0}
        testID={testID}
        text={title}
        textAlign="center"
      />
      {!!text && <Phrase>{text}</Phrase>}
    </Column>
  </Center>
)
