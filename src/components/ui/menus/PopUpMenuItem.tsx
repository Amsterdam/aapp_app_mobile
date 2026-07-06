import {View} from 'react-native'
import type {Ref} from 'react'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {PopupMenuItem} from '@/components/ui/menus/types'
import {Phrase} from '@/components/ui/text/Phrase'

export const PopUpMenuItem = ({
  ref,
  onPress,
  testID,
  label,
  color,
}: PopupMenuItem & {
  ref: Ref<View>
}) => (
  <Pressable
    onPress={onPress}
    ref={ref}
    testID={testID}>
    <Box
      insetHorizontal="md"
      insetVertical="sm">
      <Phrase
        accessible={false}
        color={color}
        testID={`${testID}Phrase`}>
        {label}
      </Phrase>
    </Box>
  </Pressable>
)
