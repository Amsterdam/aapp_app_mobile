import {useMemo} from 'react'
import {ScaledSize, StyleSheet, View, ViewStyle} from 'react-native'
import {config} from '@/components/ui/config'
import {ListMarkerGlyph, ListMarkerProp} from '@/components/ui/text/list/types'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'

type Props = {
  additionalStyles?: ViewStyle
} & ListMarkerProp &
  TestProps

export const ListItemMarker = ({additionalStyles, marker, testID}: Props) => {
  const {fontScale} = useDeviceContext()
  const styles = useMemo(
    () => createListItemMarkerStyles(fontScale),
    [fontScale],
  )

  return (
    <View style={[styles.marker, additionalStyles]}>
      <Phrase
        accessible={false}
        importantForAccessibility="no"
        testID={testID}>
        {ListMarkerGlyph[marker]}
      </Phrase>
    </View>
  )
}

const createListItemMarkerStyles = (fontScale: ScaledSize['fontScale']) =>
  StyleSheet.create({
    marker: {
      width: config.listItemMarkerBoxWidth * fontScale,
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
  })
