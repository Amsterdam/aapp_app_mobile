import {type ReactNode, memo, useMemo} from 'react'
import {type ImageSourcePropType, StyleSheet, View} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import type {LogProps} from '@/processes/piwik/types'
import type {Theme} from '@/themes/themes'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {AspectRatio} from '@/components/ui/layout/AspectRatio'
import {Gutter} from '@/components/ui/layout/Gutter'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import ProjectWarningFallbackImage from '@/modules/construction-work/assets/images/project-warning-fallback.svg'
import {useThemable} from '@/themes/useThemable'

type Props = {
  additionalAccessibilityLabel?: string
  children?: ReactNode
  imageSource?: ImageSourcePropType
  isDummyItem?: boolean
  onPress: () => void
  subtitle?: string | null
  title: string
  width?: number
} & TestProps &
  LogProps

export const ProjectCard = memo(
  ({
    additionalAccessibilityLabel,
    children,
    imageSource,
    isDummyItem,
    onPress,
    subtitle,
    testID,
    title,
    width,
    ...logProps
  }: Props) => {
    const createdStyles = useMemo(() => createStyles({width: width}), [width])
    const styles = useThemable(createdStyles)

    return (
      <>
        <PressableBase
          accessibilityLabel={[title, subtitle, additionalAccessibilityLabel]
            .filter(Boolean)
            .join(', ')}
          accessibilityRole="button"
          onPress={onPress}
          style={({pressed}) => [styles.pressable, pressed && styles.pressed]}
          testID={testID}
          {...logProps}>
          <AspectRatio aspectRatio="wide">
            <LazyImage
              missingSourceFallback={
                !isDummyItem ? (
                  <ProjectWarningFallbackImage />
                ) : (
                  <Skeleton isLoading>
                    <View style={styles.image} />
                  </Skeleton>
                )
              }
              source={imageSource}
              testID="ConstructionWorkProjectCardImage"
            />
          </AspectRatio>
          <Gutter height="sm" />
          {!!children && (
            <>
              {children}
              <Gutter height="xs" />
            </>
          )}
          <Title
            color="link"
            level="h4"
            testID="ConstructionWorkProjectCardTitle"
            text={title}
          />
          {!!subtitle && (
            <Paragraph testID="ConstructionWorkProjectCardSubtitle">
              {subtitle}
            </Paragraph>
          )}
          {/*TODO Replace with better `Grid` gutters */}
          <Gutter height="sm" />
        </PressableBase>
        <Gutter height="sm" />
      </>
    )
  },
)

const createStyles =
  ({width}: Partial<Props>) =>
  ({color}: Theme) =>
    StyleSheet.create({
      pressable: {
        width,
        flexGrow: 1,
      },
      pressed: {
        backgroundColor: color.card.pressed.background,
      },
      image: {
        width: '100%',
        height: '100%',
      },
    })
