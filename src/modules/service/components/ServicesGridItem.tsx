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

type Props = Service & {
  background?: keyof Theme['color']['backgroundArea']
  detailsRouteName: RoutesAcceptingParams<Pick<Service, 'id' | 'title'>>
}

export const ServicesGridItem = ({
  icon,
  title,
  id,
  detailsRouteName,
  background = 'primary',
}: Props) => {
  const styles = useThemable(createStyles(background))
  const {navigate} = useNavigation()
  const labelColor = background === 'primary' ? 'inverse' : 'default'

  return (
    <Pressable
      onPress={() => navigate(detailsRouteName, {id, title})}
      testID={`ServiceGridItem${pascalCase(title)}Button`}>
      <View style={styles.item}>
        <Column
          gutter="sm"
          halign="center">
          <Icon
            color={labelColor}
            path={icon}
            size="xll"
          />
          <Phrase
            color={labelColor}
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
  (background: keyof Theme['color']['backgroundArea']) => (theme: Theme) =>
    StyleSheet.create({
      item: {
        aspectRatio: 1,
        flex: 1,
        padding: theme.size.spacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.color.backgroundArea[background],
      },
    })
