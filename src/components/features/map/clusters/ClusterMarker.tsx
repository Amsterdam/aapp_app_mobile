import {View, StyleSheet} from 'react-native'
import type {Theme} from '@/themes/themes'
import {ClusterMarkerWrapper} from '@/components/features/map/clusters/ClusterMarkerWrapper'
import {calculateClusterDimensions} from '@/components/features/map/utils/calculateClusterDimensions'
import {Phrase} from '@/components/ui/text/Phrase'
import {useThemable} from '@/themes/useThemable'

const DEFAULT_OUTER_PADDING = 12

type Props = {
  count: number
  pie?: {
    color: string
    percentage: number
  }[]
}

export const ClusterMarker = ({count, pie}: Props) => {
  const styles = useThemable(theme => createStyles(theme, count, !!pie))
  const size = calculateClusterDimensions(count, DEFAULT_OUTER_PADDING)

  return (
    <ClusterMarkerWrapper
      pie={pie}
      size={size}
      style={[styles.clusterBase, styles.clusterOuter]}>
      <View style={[styles.clusterBase, styles.clusterInner]}>
        <Phrase
          color={pie ? 'default' : 'inverse'}
          emphasis="strong">
          {count}
        </Phrase>
      </View>
    </ClusterMarkerWrapper>
  )
}

const createStyles = ({color}: Theme, count: number, isPie: boolean) => {
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
      zIndex: 2,
    },
    clusterOuter: {
      backgroundColor: `${color.backgroundArea.primary}30`,
      width: outerClusterSize,
      height: outerClusterSize,
    },
    clusterInner: {
      backgroundColor: isPie
        ? color.box.background.distinct
        : color.backgroundArea.primary,
      width: innerClusterSize,
      height: innerClusterSize,
    },
  })
}
