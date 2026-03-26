import {View, StyleSheet} from 'react-native'
import type {Theme} from '@/themes/themes'
import {calculateClusterDimensions} from '@/components/features/map/utils/calculateClusterDimensions'
import {Phrase} from '@/components/ui/text/Phrase'
import {useThemable} from '@/themes/useThemable'

const DEFAULT_OUTER_PADDING = 12

export const ClusterMarker = ({count}: {count: number}) => {
  const styles = useThemable(theme => createStyles(theme, count))

  return (
    <View style={[styles.clusterBase, styles.clusterOuter]}>
      <View style={[styles.clusterBase, styles.clusterInner]}>
        <Phrase
          color="inverse"
          emphasis="strong">
          {count}
        </Phrase>
      </View>
    </View>
  )
}

const createStyles = (theme: Theme, count: number) => {
  const innerClusterSize = calculateClusterDimensions(count)
  const outerClusterSize = calculateClusterDimensions(
    count,
    DEFAULT_OUTER_PADDING,
  )

  return StyleSheet.create({
    clusterBase: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100%',
    },
    clusterOuter: {
      backgroundColor: `${theme.color.backgroundArea.primary}30`,
      width: outerClusterSize,
      height: outerClusterSize,
    },
    clusterInner: {
      backgroundColor: theme.color.backgroundArea.primary,
      width: innerClusterSize,
      height: innerClusterSize,
    },
  })
}
