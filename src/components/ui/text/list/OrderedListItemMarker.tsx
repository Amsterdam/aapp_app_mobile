import {useMemo} from 'react'
import {ScaledSize, StyleSheet, View, ViewStyle} from 'react-native'
import {config} from '@/components/ui/config'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'

type Props = {
  additionalStyles?: ViewStyle
  number: number | string
} & TestProps

export const OrderedListItemMarker = ({
  additionalStyles,
  number,
  testID,
}: Props) => {
  const {fontScale} = useDeviceContext()
  const styles = useMemo(() => createStyles(fontScale), [fontScale])

  return (
    <View style={[styles.marker, additionalStyles]}>
      <Phrase
        accessible
        testID={testID}>
        {number}.
      </Phrase>
    </View>
  )
}

const createStyles = (fontScale: ScaledSize['fontScale']) =>
  StyleSheet.create({
    marker: {
      width: config.listItemMarkerBoxWidth * fontScale,
      alignItems: 'flex-end',
      alignSelf: 'flex-start',
    },
  })
