import type {Ref} from 'react'
import {View} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {PopupMenuItem} from '@/components/ui/menus/types'
import {Phrase} from '@/components/ui/text/Phrase'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {useMenu} from '@/store/slices/menu'

type Props = PopupMenuItem & {
  ref: Ref<View>
}

export const PopUpMenuItem = ({
  ref,
  onPress,
  redirectKey,
  testID,
  label,
  color = 'link',
}: Props) => {
  const {openRedirect, isLoading, isError} = useOpenRedirect()
  const {close} = useMenu()

  if (redirectKey && (isLoading || isError)) {
    return null
  }

  return (
    <Pressable
      accessibilityHint={redirectKey ? 'Opent in webbrowser.' : undefined}
      accessibilityRole={redirectKey ? 'link' : 'button'}
      onPress={() => {
        close()

        if (redirectKey) {
          openRedirect(redirectKey)
        } else {
          onPress?.()
        }
      }}
      ref={ref}
      testID={testID}>
      <Box
        insetHorizontal="md"
        insetVertical="sm">
        <Row gutter="xs">
          <Phrase
            accessible={false}
            color={color}
            testID={`${testID}Phrase`}>
            {label}
          </Phrase>
          {!!redirectKey && (
            <Icon
              color="link"
              name="link-external"
              size="md"
              testID={`${testID}Icon`}
            />
          )}
        </Row>
      </Box>
    </Pressable>
  )
}
