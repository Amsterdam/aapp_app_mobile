import {IconButton} from '@/components/ui/buttons/IconButton'
import {Row} from '@/components/ui/layout/Row'
import {Icon, IconProps} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ModuleHeaderComponents} from '@/modules/home/components/ModuleHeaderComponents'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {isDevApp} from '@/processes/development'

export const HeaderNavigation = () => {
  const navigation = useNavigation<HomeRouteName>()

  const iconProps: Partial<IconProps> = {
    color: 'link',
    size: 'lgx',
  }

  return (
    <Row gutter="md">
      {!!isDevApp && (
        <IconButton
          accessibilityLabel="Selecteer omgeving"
          icon={
            <Icon
              isFilled
              name="power-plug-with-socket"
              {...iconProps}
              testID="HeaderEnvironmentIcon"
            />
          }
          onPress={() => navigation.navigate(HomeRouteName.admin)}
          testID="HeaderEnvironmentButton"
        />
      )}
      <ModuleHeaderComponents />
      <IconButton
        accessibilityLabel="Mijn profiel"
        icon={
          <Icon
            isFilled
            name="person"
            {...iconProps}
            testID="HeaderUserIcon"
          />
        }
        onPress={() => navigation.navigate(ModuleSlug.user)}
        testID="HeaderUserButton"
      />
    </Row>
  )
}
