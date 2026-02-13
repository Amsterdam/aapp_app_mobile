import {View} from 'react-native'
import type {UserMenuSection} from '@/modules/user/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AddressRouteName} from '@/modules/address/routes'
import {ModuleSlug} from '@/modules/slugs'
import {AppInfoCopyButtons} from '@/modules/user/components/AppInfoCopyButtons'
import {aboutSections} from '@/modules/user/constants'
import {UserRouteName} from '@/modules/user/routes'

const accessCodeSection: UserMenuSection = {
  title: 'Beveiliging',
  navigationItems: [
    {
      icon: {name: 'access-code'},
      label: 'Wijzig toegangscode',
      moduleSlug: ModuleSlug['access-code'],
    },
    {
      icon: {name: 'lock-closed'},
      label: 'Toegang met biometrische gevens',
      route: UserRouteName.userBiometrics,
    },
  ],
}

const generalSection = [
  {
    navigationItems: [
      {
        icon: {name: 'person-circle', isFilled: true},
        label: 'Mijn accounts',
        route: UserRouteName.accounts,
      },
      {
        icon: {name: 'house'},
        label: 'Mijn adres',
        moduleSlug: ModuleSlug.address,
        route: AddressRouteName.address,
      },
      {
        icon: {name: 'bell-push'},
        label: 'Pushmeldingen',
        route: UserRouteName.notificationSettings,
      },
      {
        icon: {name: 'settings'},
        label: 'Onderwerpen in de app',
        route: UserRouteName.moduleSettings,
      },
    ],
  },
] satisfies UserMenuSection[]

const MenuSection = ({title, navigationItems}: UserMenuSection) => {
  const {biometricsLabel, isEnrolled} = useAccessCodeBiometrics()
  const {navigate} = useNavigation()

  return (
    <Column gutter="sm">
      {!!title && (
        <Box insetLeft="md">
          <Title
            level="h5"
            text={title}
          />
        </Box>
      )}
      <Column gutter="xxs">
        {navigationItems.map(({icon, ...item}) =>
          item.route === UserRouteName.userBiometrics &&
          (!biometricsLabel || !isEnrolled) ? null : (
            <NavigationButton
              chevronSize="md"
              emphasis="default"
              icon={icon ? {...icon, size: 'lg'} : undefined}
              key={item.label}
              {...item}
              onPress={() =>
                navigate(item.moduleSlug ?? ModuleSlug.user, {
                  screen: item.route,
                })
              }
              testID={`UserNavigationTo${item.route}Button`}
              title={
                item.route === UserRouteName.userBiometrics
                  ? `Toegang met ${biometricsLabel}`
                  : item.label
              }
            />
          ),
        )}
      </Column>
    </Column>
  )
}

export const UserMenu = () => {
  const {accessCode} = useGetSecureAccessCode()

  return (
    <View testID="UserMenu">
      <Column gutter="md">
        <Column gutter="lg">
          {generalSection.map(section => (
            <MenuSection
              key={section.navigationItems[0].icon?.name}
              {...section}
            />
          ))}

          {!!accessCode && <MenuSection {...accessCodeSection} />}

          {aboutSections.map(section => (
            <MenuSection
              key={section.title}
              {...section}
            />
          ))}
        </Column>

        <AppInfoCopyButtons />
      </Column>
    </View>
  )
}
