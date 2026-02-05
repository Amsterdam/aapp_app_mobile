import {useCallback} from 'react'
import {Button, ButtonProps} from '@/components/ui/buttons/Button'

type Props = {
  followed: boolean
  onPress: (followed: boolean) => void
} & Omit<ButtonProps, 'onPress' | 'style'>

export const FollowButton = ({
  followed,
  onPress,
  ...otherButtonProps
}: Props) => {
  const follow = useCallback(() => onPress(false), [onPress])
  const unfollow = useCallback(() => onPress(true), [onPress])

  if (followed) {
    return (
      <Button
        icon={{name: 'check-mark'}}
        label="Volgend"
        onPress={unfollow}
        variant="primary"
        {...otherButtonProps}
      />
    )
  }

  return (
    <Button
      icon={{name: 'plus', size: 'lgx'}}
      label="Volgen"
      onPress={follow}
      variant="secondary"
      {...otherButtonProps}
    />
  )
}
