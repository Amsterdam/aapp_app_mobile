import {Linking} from 'react-native'
import {RESULTS} from 'react-native-permissions'
import type {CarouselItem} from '@/modules/onboarding/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useSelector} from '@/hooks/redux/useSelector'
import {AddressModalName} from '@/modules/address/routes'
import {useMyAddress} from '@/modules/address/slice'
import {getAddressLineWithCityIfNotAmsterdam} from '@/modules/address/utils/getAddressLineWithCityIfNotAmsterdam'
import {useLoginMijnAmsterdam} from '@/modules/mijn-amsterdam/hooks/useLoginMijnAmsterdam'
import {useIsLoggedIn} from '@/modules/mijn-amsterdam/useIsLoggedIn'
import {
  selectIsPermissionGranted,
  selectPermissions,
} from '@/store/slices/permissions'
import {Permissions} from '@/types/permissions'

export const onboardingData = [
  {
    variants: {
      default: {
        icon: {
          name: 'bell',
        },
        title: 'Wilt u meldingen ontvangen?',
        text: 'Zoals herinneringen voor afval ophalen, einde parkeersessie en berichten over bijvoorbeeld storm of storingen.',
        button: {
          useOnPress: () => {
            const {requestPermission} = usePermission(Permissions.notifications)

            return requestPermission
          },
          label: 'Meldingen toestaan',
        },
        testID: 'OnboardingCarouselNotificationsDefaultSlide',
      },
      noPermission: {
        icon: {
          name: 'bell-off',
        },
        title: 'Meldingen staan uit',
        text: 'U ontvangt geen meldingen van de app. Dit kunt u aanpassen via Instellingen.',
        contentButton: {
          onPress: () => Linking.openSettings(),
          label: 'Ga naar Instellingen',
          external: true,
        },
        testID: 'OnboardingCarouselNotificationsNoPermissionSlide',
      },
      hasPermission: {
        icon: {
          name: 'success',
          color: 'confirm',
          isFilled: true,
        },
        title: 'Meldingen staan aan',
        text: 'U ontvangt meldingen van de app. ',
        testID: 'OnboardingCarouselNotificationsHasPermissionSlide',
      },
    },
    useVariant: () => {
      const permission =
        useSelector(selectPermissions)[Permissions.notifications]

      if (permission?.granted) {
        return 'hasPermission'
      } else if (permission?.status === RESULTS.BLOCKED) {
        return 'noPermission'
      } else {
        return 'default'
      }
    },
  } as CarouselItem<'default' | 'noPermission' | 'hasPermission'>,
  {
    variants: {
      noMyAddress: {
        icon: {
          name: 'house',
        },
        title: 'Stel Mijn adres in',
        text: 'Veel informatie, zoals afvalwijzer, stookwijzer en werkzaamheden, wordt aangepast aan uw adres. Stel Mijn adres in om direct alles te zien dat bij u hoort.',
        button: {
          useOnPress: () => {
            const {navigate} = useNavigation()

            return () =>
              navigate(AddressModalName.myAddressForm, {
                showAlertAfterSuccess: false,
              })
          },
          label: 'Mijn adres instellen',
        },
        testID: 'OnboardingCarouselMyAddressNoAddressSlide',
      },
      hasMyAddress: {
        icon: {
          name: 'success',
          color: 'confirm',
          isFilled: true,
        },
        title: 'Mijn adres is ingesteld',
        useText: () => {
          const myAddress = useMyAddress()

          return getAddressLineWithCityIfNotAmsterdam(myAddress)
        },
        contentButton: {
          useOnPress: () => {
            const {navigate} = useNavigation()

            return () =>
              navigate(AddressModalName.myAddressForm, {
                showAlertAfterSuccess: false,
              })
          },
          label: 'Adres wijzigen',
        },
        testID: 'OnboardingCarouselMyAddressHasAddressSlide',
      },
    },
    useVariant: () => {
      const myAddress = useMyAddress()

      if (myAddress) {
        return 'hasMyAddress'
      }

      return 'noMyAddress'
    },
  } as CarouselItem<'noMyAddress' | 'hasMyAddress'>,
  {
    variants: {
      notLoggedIn: {
        icon: {
          name: 'mijn-amsterdam',
        },
        title: 'Mijn Amsterdam',
        text: 'Blijf op de hoogte van uw aanvraag of klacht. Log in om meldingen van Mijn Amsterdam te ontvangen in de app.',
        button: {
          useOnPress: () => {
            const login = useLoginMijnAmsterdam()

            return login
          },
          label: 'Inloggen met DigiD',
          digid: true,
        },
        testID: 'OnboardingCarouselMijnAmsterdamNotLoggedInSlide',
      },
      loggedIn: {
        icon: {
          name: 'success',
          color: 'confirm',
          isFilled: true,
        },
        title: 'U bent ingelogd bij Mijn Amsterdam',
        text: 'U ontvangt nu meldingen van Mijn Amsterdam.',
        testID: 'OnboardingCarouselMijnAmsterdamLoggedInSlide',
      },
      loggedInNoPermission: {
        icon: {
          name: 'success',
          color: 'confirm',
          isFilled: true,
        },
        showNotificationPermissionSettings: true,
        title: 'U bent ingelogd bij Mijn Amsterdam',
        testID: 'OnboardingCarouselMijnAmsterdamLoggedInNoPermissionSlide',
      },
    },
    useVariant: () => {
      const {isLoggedIn} = useIsLoggedIn()
      const permissionGranted = useSelector(
        selectIsPermissionGranted(Permissions.notifications),
      )

      if (isLoggedIn) {
        if (!permissionGranted) {
          return 'loggedIn'
        } else {
          return 'loggedInNoPermission'
        }
      } else {
        return 'notLoggedIn'
      }
    },
  } as CarouselItem<'notLoggedIn' | 'loggedIn' | 'loggedInNoPermission'>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
] satisfies CarouselItem<any>[]
