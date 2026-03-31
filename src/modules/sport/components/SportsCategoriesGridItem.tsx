import {pascalCase} from 'pascal-case'
import {StyleSheet, View} from 'react-native'
import type {Theme} from '@/themes/themes'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {SportRouteName} from '@/modules/sport/routes'
import {useThemable} from '@/themes/useThemable'

export const SportsCategoriesGridItem = ({
  title,
  id,
  icon,
}: {
  icon: string
  id: string
  title: string
}) => {
  const styles = useThemable(createStyles)
  const {navigate} = useNavigation()

  return (
    <Pressable
      onPress={() => navigate(SportRouteName.sportCategory, {id, title})}
      testID={`SportsCategoriesGridItem${pascalCase(title)}Button`}>
      <View style={styles.item}>
        <Column
          gutter="sm"
          halign="center">
          <Icon
            color="inverse"
            path={icon}
            size="xll"
          />
          <Phrase
            color="inverse"
            textAlign="center"
            variant="body">
            {title}
          </Phrase>
        </Column>
      </View>
    </Pressable>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    item: {
      aspectRatio: 1,
      flex: 1,
      padding: theme.size.spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.color.backgroundArea.primary,
    },
  })
