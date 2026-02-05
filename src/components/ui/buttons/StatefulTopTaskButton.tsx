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
  const {text: buttonText, icon} = topTaskButtonProps
  const [iconName, setIconName] = useState(icon.name)
  const [text, setText] = useState(buttonText)

  useEffect(() => {
    if (!isLoading && !isError) {
      setText(buttonText)

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
  }, [isLoading, isError, buttonText])

  return (
    <TopTaskButton
      {...topTaskButtonProps}
      icon={{name: iconName}}
      isError={isError}
      text={text}
    />
  )
}
