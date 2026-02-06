import {StyleSheet, View} from 'react-native'
import simplur from 'simplur'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {notificationHistoryModule} from '@/modules/notification-history'
import {useGetNotificationsQuery} from '@/modules/notification-history/service'
import {ModuleSlug} from '@/modules/slugs'
import {useGetCachedServerModule} from '@/store/slices/modules'

export const HeaderComponent = () => {
  const navigation = useNavigation()
  const {isInactive} = useGetCachedServerModule(notificationHistoryModule.slug)
  const {data} = useGetNotificationsQuery(undefined, {skip: isInactive})
  const styles = createStyles(isInactive ? 0.7 : undefined)

  const unreadNotifications = data?.filter(({is_read}) => !is_read).length ?? 0
  const accessibilityLabel = unreadNotifications
    ? unreadNotifications +
      'ongelezen' +
      simplur`[melding|meldingen]${[unreadNotifications]}`
    : 'Meldingen'

  return (
    <View style={styles.container}>
      <IconButton
        accessibilityLabel={accessibilityLabel}
        badgeColor={isInactive ? 'info' : undefined}
        badgeValue={
          isInactive
            ? '!'
            : unreadNotifications > 0
              ? unreadNotifications
              : undefined
        }
        icon={
          <Icon
            color="link"
            isFilled
            name="bell"
            size="lgx"
            testID="HeaderNotificationHistoryIcon"
          />
        }
        onPress={() => navigation.navigate(ModuleSlug['notification-history'])}
        testID="HeaderNotificationHistoryButton"
      />
    </View>
  )
}

const createStyles = (opacity?: number) =>
  StyleSheet.create({
    container: {
      opacity,
    },
  })
