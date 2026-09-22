import {useEffect} from 'react'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useAccessibilityAnnounce} from '@/hooks/accessibility/useAccessibilityAnnounce'

type Props = {
  error: string
}

export const AccessCodeError = ({error}: Props) => {
  const accessibilityAnnounce = useAccessibilityAnnounce()

  useEffect(() => {
    accessibilityAnnounce(error)
  })

  return <Paragraph color="negative">{error}</Paragraph>
}
