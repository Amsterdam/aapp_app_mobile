import {type ReactNode} from 'react'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {parseTextToComponentsForLinks} from '@/utils/parseTextToComponentsForLinks'

export const parseTextToComponentsWithInlineLinks = (
  text: string,
  openUrl: (url: string) => void,
  isInverse: boolean,
): ReactNode[] =>
  parseTextToComponentsForLinks(text, part => (
    <InlineLink
      isInverse={isInverse}
      key={part}
      onPress={() => openUrl(part)}
      testID={`InlineLink${part}Link`}>
      {part}
    </InlineLink>
  ))
