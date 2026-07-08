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

export type ServicesGridItemColorScheme = keyof Theme['color']['serviceGrid']

type Props = Service & {
  colorScheme?: ServicesGridItemColorScheme
  detailsRouteName: RoutesAcceptingParams<Pick<Service, 'id' | 'title'>>
}

const CONTENT_COLOR_MAP: Record<
  ServicesGridItemColorScheme,
  keyof Theme['color']['text']
> = {
  default: 'inverse',
  kingsday: 'default',
  prideMagenta: 'inverse',
  pridePurple: 'inverse',
}

export const ServicesGridItem = ({
  icon,
  title,
  id,
  detailsRouteName,
  colorScheme = 'default',
}: Props) => {
  const styles = useThemable(createStyles(colorScheme))
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
            color={CONTENT_COLOR_MAP[colorScheme]}
            path={icon}
            size="xll"
          />
          <Phrase
            color={CONTENT_COLOR_MAP[colorScheme]}
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
  (colorScheme: keyof Theme['color']['serviceGrid']) => (theme: Theme) =>
    StyleSheet.create({
      item: {
        aspectRatio: 1,
        flex: 1,
        padding: theme.size.spacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.color.serviceGrid[colorScheme].background,
      },
    })
