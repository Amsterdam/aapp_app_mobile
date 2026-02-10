import type {TestProps} from '@/components/ui/types'
import type {GestureResponderEvent} from 'react-native'
import DigiD from '@/assets/icons/digid.svg'
import {Button} from '@/components/ui/buttons/Button'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'

type Props = {
  isLoading?: boolean
  onPress: (event: GestureResponderEvent) => void
} & TestProps

export const DigiDButton = ({onPress, isLoading, testID}: Props) => (
  <Column
    grow={1}
    gutter="md"
    halign="stretch">
    <Row gutter="sm">
      <Pressable
        onPress={onPress}
        testID={`${testID}IconButton`}>
        <DigiD />
      </Pressable>
      <Button
        flex={1}
        isLoading={isLoading}
        label="Inloggen met DigiD"
        onPress={onPress}
        testID={testID}
      />
    </Row>
  </Column>
)
