import type {TestProps} from '@/components/ui/types'
import {Center} from '@/components/ui/layout/Center'
import {Title} from '@/components/ui/text/Title'

export const EmptyList = ({
  text = 'Geen resultaat',
  testID,
}: {text?: string} & TestProps) => (
  <Center grow>
    <Title
      level="h5"
      shrink={0}
      testID={testID}
      text={text}
      textAlign="center"
    />
  </Center>
)
