import {StyleSheet, View} from 'react-native'
import type {Theme} from '@/themes/themes'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BurningGuideRecommendationTag} from '@/modules/burning-guide/components/BurningGuideRecommendationTag'
import {BurningGuideRouteName} from '@/modules/burning-guide/routes'
import {
  BurningGuideCodeVariant,
  type ListItem,
} from '@/modules/burning-guide/types'
import {mapVariantToRecommendationTitle} from '@/modules/burning-guide/utils/mapVariantToRecommendationTitle'
import {useThemable} from '@/themes/useThemable'

type Props = {
  recommendation: ListItem
}

export const BurningGuideRecommendation = ({
  recommendation: {variant},
}: Props) => {
  const styles = useThemable(createStyles(variant))
  const {navigate} = useNavigation()

  return (
    <View style={styles.container}>
      <Box inset="lg">
        <Column
          gutter="md"
          halign="center">
          <SingleSelectable
            accessibilityLabel={`${mapVariantToRecommendationTitle[variant]}, Code ${variant}`}>
            <Column
              gutter="md"
              halign="center">
              <Title
                accessible={false}
                level="h2"
                testID="BurningGuideRecommendationTitle"
                text={mapVariantToRecommendationTitle[variant]}
                textAlign="center"
              />
              <BurningGuideRecommendationTag
                fontSize="body"
                variant={variant}
              />
            </Column>
          </SingleSelectable>
          <NavigationButton
            chevronSize="md"
            horizontallyAlign="center"
            insetVertical="sm"
            onPress={() => {
              navigate(BurningGuideRouteName.burningGuideCodeInfo)
            }}
            testID="BurningGuideRecommendationNavigationButton"
            title="Meer informatie"
          />
        </Column>
      </Box>
    </View>
  )
}

const createStyles =
  (variant: BurningGuideCodeVariant) =>
  ({color, border}: Theme) =>
    StyleSheet.create({
      container: {
        borderWidth: border.width.xl,
        borderColor: color.burningGuide.recommendationTag[variant].background,
      },
    })
