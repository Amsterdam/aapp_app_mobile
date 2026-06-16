import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
import {useAccessibilityAnnounceEffect} from '@/hooks/accessibility/useAccessibilityAnnounce'
import {Duration} from '@/types/duration'

type Props = {
  showTitle?: boolean
  text: string
} & TestProps

export const EmptyMessage = ({showTitle = true, testID, text}: Props) => {
  const title = showTitle ? 'Helaas …' : ''

  useAccessibilityAnnounceEffect(`${title} ${text}`, Duration.normal)

  return (
    <SingleSelectable
      accessibilityLanguage="nl-NL"
      testID={testID}>
      {!!showTitle && (
        <Title
          level="h3"
          text={title}
        />
      )}
      <Paragraph>{text}</Paragraph>
    </SingleSelectable>
  )
}
