import {StyleSheet, View} from 'react-native'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {mijnAmsterdamModule} from '@/modules/mijn-amsterdam'
import {useGetCachedTheme} from '@/modules/mijn-amsterdam/slice'
import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'

export const HeaderComponent = () => {
  const navigation = useNavigation()
  const {isInactive} = useGetCachedTheme(mijnAmsterdamModule.slug)
  const styles = createStyles(isInactive ? 0.7 : undefined)

  return (
    <View style={styles.container}>
      <IconButton
        accessibilityLabel="Log in met Die-gie-dee"
        icon={
          <Icon
            color="link"
            isFilled
            name="lock-closed"
            size="lgx"
            testID="HeaderMijnAmsterdamIcon"
          />
        }
        onPress={() =>
          navigation.navigate(ModuleSlug.user, {screen: UserRouteName.accounts})
        }
        testID="HeaderMijnAmsterdamButton"
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
