import {StyleSheet, View} from 'react-native'
import type {Theme} from '@/themes/themes'
import {Box} from '@/components/ui/containers/Box'
import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {BurningGuideCodeVariant} from '@/modules/burning-guide/types'
import {useThemable} from '@/themes/useThemable'

type FontSize = Extract<keyof Theme['text']['fontSize'], 'body' | 'small'>

const scaleMap: Record<FontSize, number> = {
  body: 126,
  small: 116,
}

export const BurningGuideRecommendationTag = ({
  variant,
  fontSize = 'body',
}: {
  fontSize?: FontSize
  variant: BurningGuideCodeVariant
}) => {
  const {fontScale} = useDeviceContext()
  const styles = useThemable(createStyles(variant))

  return (
    <Size width={scaleMap[fontSize] * fontScale}>
      <View
        style={styles.tag}
        testID={`BurningGuideRecommendation${variant}`}>
        <Box
          insetHorizontal="sm"
          insetVertical="sm">
          <Phrase
            accessible={false}
            color={
              variant === BurningGuideCodeVariant.red ? 'inverse' : 'default'
            }
            emphasis="strong"
            textAlign="center"
            variant={fontSize}>
            Code {variant}
          </Phrase>
        </Box>
      </View>
    </Size>
  )
}

const createStyles =
  (variant: BurningGuideCodeVariant) =>
  ({color}: Theme) =>
    StyleSheet.create({
      tag: {
        backgroundColor:
          color.burningGuide.recommendationTag[variant].background,
      },
    })
