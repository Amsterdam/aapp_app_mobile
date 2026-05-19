import {StyleSheet, View} from 'react-native'
import type {Theme} from '@/themes/themes'
import {Box} from '@/components/ui/containers/Box'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Phrase} from '@/components/ui/text/Phrase'
import {useThemable} from '@/themes/useThemable'

type Props = {
  text: string
  variant: keyof typeof AlertVariant
}

export const Notice = ({text, variant}: Props) => {
  const styles = useThemable(createStyles(variant))

  return (
    <View
      style={styles.container}
      testID="Notice">
      <Box insetLeft="smd">
        <Phrase variant="small">{text}</Phrase>
      </Box>
    </View>
  )
}

const createStyles =
  (variant: Props['variant']) =>
  ({color, border}: Theme) =>
    StyleSheet.create({
      container: {
        borderColor: color.alert[variant].border,
        borderStyle: 'solid',
        borderLeftWidth: border.width.xl,
      },
    })
