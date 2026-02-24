import type {CarouselItem} from '@/modules/onboarding/types'

export const onboardingData: CarouselItem[] = [
  {
    iconName: 'bell',
    title: 'Wilt u meldingen  ontvangen?',
    text: 'Zoals herinneringen voor afval ophalen, einde parkeersessie en berichten over bijvoorbeeld storm of storingen. ',
    button: {
      onPress: () => {
        // do nothing
      },
      label: 'Meldingen toestaan',
    },
    testID: 'OnboardingCarouselNotificationsSlide',
  },
  {
    iconName: 'house',
    title: 'Stel Mijn adres in',
    text: 'Veel informatie, zoals afvalwijzer, stookwijzer en werkzaamheden, wordt aangepast aan uw adres. Stel Mijn adres in om direct alles te zien dat bij u hoort.',
    button: {
      onPress: () => {
        // do nothing
      },
      label: 'Mijn adres instellen',
    },
    testID: 'OnboardingCarouselMyAddressSlide',
  },
]
