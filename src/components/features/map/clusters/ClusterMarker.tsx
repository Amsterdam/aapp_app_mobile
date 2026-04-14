import {useMemo} from 'react'
import {View, StyleSheet} from 'react-native'
import type {ClusterItem} from '@/components/features/map/types'
import type {Theme} from '@/themes/themes'
import {Pie} from '@/components/features/map/clusters/Pie'
import {calculateClusterDimensions} from '@/components/features/map/utils/calculateClusterDimensions'
import {Phrase} from '@/components/ui/text/Phrase'
import {useThemable} from '@/themes/useThemable'

const DEFAULT_OUTER_PADDING = 12

type Props = {
  count: number
  groupedMarkers?: {
    color: string
    items: ClusterItem[]
  }[]
}

export const ClusterMarker = ({count, groupedMarkers}: Props) => {
  const styles = useThemable(theme =>
    createStyles(theme, count, !!groupedMarkers),
  )
  const size = calculateClusterDimensions(count, DEFAULT_OUTER_PADDING)

  const pie = useMemo(() => {
    if (!groupedMarkers) return []

    return groupedMarkers.map(({items, ...rest}) => ({
      ...rest,
      percentage: items.length / count,
    }))
  }, [groupedMarkers, count])

  const Wrapper = groupedMarkers ? Pie : View

  return (
    <Wrapper
      data={pie}
      size={size}
      style={[styles.clusterBase, styles.clusterOuter]}>
      <View style={[styles.clusterBase, styles.clusterInner]}>
        <Phrase
          color={groupedMarkers ? 'default' : 'inverse'}
          emphasis="strong">
          {count}
        </Phrase>
      </View>
    </Wrapper>
  )
}

const createStyles = (theme: Theme, count: number, isPie: boolean) => {
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
      backgroundColor: isPie
        ? theme.color.box.background.distinct
        : theme.color.backgroundArea.primary,
      width: innerClusterSize,
      height: innerClusterSize,
    },
  })
}
