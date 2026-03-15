import {pascalCase} from 'pascal-case'
import {StyleSheet, View} from 'react-native'
import type {ServiceItem} from '@/modules/service/types'
import type {Theme} from '@/themes/themes'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ServiceRouteName} from '@/modules/service/routes'
import {useThemable} from '@/themes/useThemable'

export const ServicesGridItem = ({icon, title, id}: ServiceItem) => {
  const styles = useThemable(createStyles)
  const {navigate} = useNavigation()

  return (
    <Pressable
      onPress={() => navigate(ServiceRouteName.map, {id, title})}
      testID={`ServiceItem${pascalCase(title)}Button`}>
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
