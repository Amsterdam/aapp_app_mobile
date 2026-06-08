import {StyleSheet, View} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import type {SpacingTokens} from '@/themes/tokens/size'
import type {ReactNode} from 'react'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Variant = keyof Theme['color']['tag']
type PaddingVertical = keyof Pick<SpacingTokens, 'no' | 'xs'>

type BaseProps = {
  paddingVertical?: PaddingVertical
  variant?: Variant
} & TestProps
type LabelProps = {children?: never; label: string}
type NodeProps = {children: Exclude<ReactNode, string>; label?: never}

export const Tag = ({
  children,
  label,
  variant = 'default',
  paddingVertical = 'xs',
  testID = 'Tag',
}: BaseProps & (LabelProps | NodeProps)) => {
  const styles = useThemable(createStyles(variant, paddingVertical))

  if (label) {
    return (
      <View
        style={styles.tag}
        testID={testID}>
        <Paragraph>{label}</Paragraph>
      </View>
    )
  }

  return <View style={styles.tag}>{children}</View>
}

const createStyles =
  (variant: Variant, paddingVertical: PaddingVertical) => (theme: Theme) =>
    StyleSheet.create({
      tag: {
        backgroundColor: theme.color.tag[variant].background,
        paddingHorizontal: theme.size.spacing.sm,
        paddingVertical: theme.size.spacing[paddingVertical],
      },
    })
