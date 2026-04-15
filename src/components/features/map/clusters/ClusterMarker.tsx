import {View, StyleSheet, type ViewProps} from 'react-native'
import type {Theme} from '@/themes/themes'
import {Pie} from '@/components/features/map/clusters/Pie'
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

  const Wrapper = pie
    ? (props: ViewProps) => (
        <Pie
          data={pie}
          size={size}
          {...props}
        />
      )
    : View

  return (
    <Wrapper style={[styles.clusterBase, styles.clusterOuter]}>
      <View style={[styles.clusterBase, styles.clusterInner]}>
        <Phrase
          color={pie ? 'default' : 'inverse'}
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
