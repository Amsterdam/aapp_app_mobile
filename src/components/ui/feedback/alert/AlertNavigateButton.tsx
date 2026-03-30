import {useCallback} from 'react'
import type {
  CrossStackTo,
  InStackTo,
  NavigateTo,
  RootStackParams,
} from '@/app/navigation/types'
import type {TestProps} from '@/components/ui/types'
import type {GestureResponderEvent} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'

const isCrossStackTo = (options: NavigateTo): options is CrossStackTo =>
  !!options[1] && typeof options[1] === 'object' && 'screen' in options[1]

const isInStackTo = (options: NavigateTo): options is InStackTo =>
  !!options[0] &&
  typeof options[0] === 'string' &&
  !(options[1] && typeof options === 'object' && 'screen' in options[1])

type Props = {label: string; params: NavigateTo} & TestProps

export const AlertNavigateButton = ({label, params, testID}: Props) => {
  const {navigate} = useNavigation()

  const handleNavigate = useCallback(
    (e: GestureResponderEvent) => {
      e?.preventDefault()

      if (isCrossStackTo(params)) {
        const [route, props] = params

        navigate(route, {...props}) // Navigate cross-Stack to screen with associated params
      }

      if (isInStackTo(params)) {
        const [route, props] = params

        navigate(route as keyof RootStackParams, {...props} as never) // Navigate in-Stack with associated params
      }
    },
    [params, navigate],
  )

  return (
    <Button
      alignSelf="flex-start"
      icon={{name: 'chevron-right', size: 'md'}}
      isReverseOrder
      label={label}
      noPaddingHorizontal
      onPress={handleNavigate}
      testID={`${testID}Button`}
      variant="tertiary"
    />
  )
}
