import {useEffect, useState} from 'react'
import {
  TopTaskButton,
  TopTaskButtonProps,
} from '@/components/ui/buttons/TopTaskButton'

type StatefulTopTaskButtonProps = {
  isError?: boolean
  isLoading?: boolean
} & TopTaskButtonProps

export const StatefulTopTaskButton = ({
  isError = false,
  isLoading = false,
  ...topTaskButtonProps
}: StatefulTopTaskButtonProps) => {
  const {text: buttonText, iconName: buttonIconName} = topTaskButtonProps
  const [iconName, setIconName] = useState(buttonIconName)
  const [text, setText] = useState(buttonText)

  useEffect(() => {
    if (!isLoading && !isError) {
      setText(buttonText)
      setIconName(buttonIconName)

      return
    }

    if (isLoading) {
      setText('...')
      setIconName('spinner')

      return
    }

    if (isError) {
      setText('Er gaat iets mis. Probeer het later nog een keer.')
      setIconName('warning')
    }
  }, [isLoading, isError, buttonText, buttonIconName])

  return (
    <TopTaskButton
      {...topTaskButtonProps}
      iconName={iconName}
      isError={isError}
      text={text}
    />
  )
}
