import {useCallback} from 'react'
import type {CrossStackTo, InStackTo, NavigateTo} from '@/app/navigation/types'
import type {AlertProps} from '@/components/ui/feedback/alert/Alert.types'
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

type Props = AlertProps['navigateTo'] & TestProps

export const AlertNavigateButton = ({
  label,
  params,
  type = 'navigate',
  testID,
}: Props) => {
  const navigation = useNavigation()

  const handleNavigate = useCallback(
    (e: GestureResponderEvent) => {
      e?.preventDefault()

      const navigateTo =
        type === 'navigate'
          ? navigation.navigate
          : type === 'replace'
            ? navigation.replace.bind(this)
            : navigation.popTo.bind(this)

      if (isCrossStackTo(params)) {
        const [route, props] = params

        navigateTo(route, {...props}) // Navigate cross-Stack to screen with associated params
      }

      if (isInStackTo(params)) {
        const [route, props] = params

        // @ts-expect-error - This is a valid navigation route, but somehow it does not understand the params type
        navigateTo(route, {...props}) // Navigate in-Stack with associated params
      }
    },
    [params, navigation, type],
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
