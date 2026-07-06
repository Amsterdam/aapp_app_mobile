import {pascalCase} from 'pascal-case'
import {StyleSheet, View} from 'react-native'
import type {RoutesAcceptingParams} from '@/app/navigation/types'
import type {Service} from '@/modules/service/types'
import type {Theme} from '@/themes/themes'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useThemable} from '@/themes/useThemable'

export type ServicesGridItemColors = {
  background: keyof Theme['color']['backgroundArea'] | `#${string}`
  label: keyof Theme['color']['text']
}
type Props = Service & {
  colors?: ServicesGridItemColors
  detailsRouteName: RoutesAcceptingParams<Pick<Service, 'id' | 'title'>>
}

export const ServicesGridItem = ({
  icon,
  title,
  id,
  detailsRouteName,
  colors = {background: 'primary', label: 'inverse'},
}: Props) => {
  const styles = useThemable(createStyles(colors.background))
  const {navigate} = useNavigation()

  return (
    <Pressable
      onPress={() => navigate(detailsRouteName, {id, title})}
      testID={`ServiceGridItem${pascalCase(title)}Button`}>
      <View style={styles.item}>
        <Column
          gutter="sm"
          halign="center">
          <Icon
            color={colors.label}
            path={icon}
            size="xll"
          />
          <Phrase
            color={colors.label}
            textAlign="center"
            variant="body">
            {title}
          </Phrase>
        </Column>
      </View>
    </Pressable>
  )
}

const createStyles =
  (backgroundColor: ServicesGridItemColors['background']) => (theme: Theme) =>
    StyleSheet.create({
      item: {
        aspectRatio: 1,
        flex: 1,
        padding: theme.size.spacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          backgroundColor in theme.color.backgroundArea
            ? theme.color.backgroundArea[
                backgroundColor as keyof Theme['color']['backgroundArea']
              ]
            : backgroundColor,
      },
    })
