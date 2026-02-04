import {StyleSheet, View} from 'react-native'
import type {RedirectKey} from '@/modules/redirects/types'
import {Pressable, type PressableProps} from '@/components/ui/buttons/Pressable'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {useThemable} from '@/themes/useThemable'

type Props = {
  redirectKey?: RedirectKey
  text: string
} & Omit<PressableProps, 'children'> &
  TestProps

export const MoreInfoButton = ({
  onPress,
  testID,
  text,
  ...pressableProps
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        {...pressableProps}
        testID={`${testID}MoreInfoButton`}>
        <Row valign="center">
          <Phrase color="link">{text} </Phrase>
          <Icon
            color="link"
            name="chevron-down"
          />
        </Row>
      </Pressable>
    </View>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'baseline',
    },
  })
