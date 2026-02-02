import {SvgIconName} from '@/components/ui/media/svgIcons'
import {type TestProps} from '@/components/ui/types'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {RedirectKey} from '@/modules/redirects/types'

type RedirectResponse = {
  iconName: SvgIconName
  routeName?: RedirectsRouteName
  text: string
  title: string
  urlKey?: RedirectKey
} & TestProps

export const redirects: RedirectResponse[] = [
  {
    iconName: 'vote',
    testID: 'RedirectsElectionsButton',
    text: '18 maart 2026',
    title: 'Verkiezingen',
    urlKey: RedirectKey.elections,
  },
  {
    iconName: 'parkingCar',
    testID: 'RedirectsParkingButton',
    text: 'Alles over parkeren en verkeer in de stad.',
    title: 'Parkeren',
    urlKey: RedirectKey.parking,
  },
  {
    iconName: 'formalDocument',
    testID: 'RedirectsDeedsAndStatementsButton',
    text: 'Geboorte-, huwelijks- en andere akten, uittreksel, VOG.',
    title: 'Akten, uittreksels en verklaringen',
    urlKey: RedirectKey.documents,
  },
  {
    iconName: 'historicHouse',
    testID: 'RedirectsMoveButton',
    text: 'Naar en binnen Amsterdam.',
    title: 'Verhuizing doorgeven',
    urlKey: RedirectKey.relocation,
  },
  {
    iconName: 'buildings',
    routeName: RedirectsRouteName.selectCity,
    testID: 'RedirectsMakeAppointmentButton',
    text: 'Bekijk voor welke onderwerpen u een afspraak kunt maken.',
    title: 'Afspraak maken op Stadsloket',
  },
  {
    iconName: 'euroCoinsInverted',
    testID: 'RedirectsLowIncomeAidButton',
    text: 'Regelingen bij laag inkomen / Pak je kans.',
    title: 'Hulp bij een laag inkomen',
    urlKey: RedirectKey.income_help,
  },
  {
    iconName: 'awardRibbon',
    testID: 'RedirectsSailingAndMooringButton',
    text: 'Koop een vaarvignet als u met uw boot in Amsterdam en Weesp wilt varen of afmeren.',
    title: 'Vignet voor varen en afmeren',
    urlKey: RedirectKey.sailingAndMooring,
  },
]
