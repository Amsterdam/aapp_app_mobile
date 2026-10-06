import {useEffect} from 'react'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {useAccessibilityAnnounce} from '@/hooks/accessibility/useAccessibilityAnnounce'

type Props = {
  error: string
}

export const AccessCodeError = ({error}: Props) => {
  const accessibilityAnnounce = useAccessibilityAnnounce()

  useEffect(() => {
    accessibilityAnnounce(error)
  })

  return (
    <ErrorMessage
      testID="AccessCodeErrorErrorMessage"
      text={error}
    />
  )
}
