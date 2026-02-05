import {AboutBlock} from '@/modules/city-pass/types'
import {RedirectKey} from '@/modules/redirects/types'

export const DEFAULT_PASS_WIDTH = 312
export const CITY_PASS_HEIGHT = 520
export const NEXT_CARD_VISIBLE_FRACTION_OF_AVAILABLE_SPACE = 0.33

export const SOMETHING_WENT_WRONG_TEXT =
  'Helaas kunnen de Stadspas gegevens niet geladen worden. Probeer het later nog eens.'

export const aboutBlocks: AboutBlock[] = [
  {
    icon: {name: 'list'},
    redirectKey: RedirectKey.citypass,
    title: 'Bekijk het aanbod',
    text: 'Gratis of met korting sporten, naar de bioscoop, het theater, of het museum.',
    testID: 'CityPassOverviewLink',
  },
  {
    icon: {isFilled: true, name: 'child'},
    redirectKey: RedirectKey.cityPassChildBudget,
    title: 'Over het kindtegoed',
    text: 'Kinderen tot en met 17 jaar krijgen Kindtegoed op hun Stadspas.',
    testID: 'CityPassChildBudgetLink',
  },
  {
    icon: {name: 'wallet'},
    redirectKey: RedirectKey.cityPassLowIncomeSupport,
    title: 'Hulp bij weinig geld',
    text: 'Kijk welke regelingen er zijn.',
    testID: 'CityPassLowIncomeSupportLink',
  },
  {
    icon: {isFilled: true, name: 'question-mark-circle'},
    redirectKey: RedirectKey.cityPassUsage,
    title: 'Zo werkt je Stadspas',
    text: 'Lees meer over wat de Stadspas is en hoe het werkt.',
    testID: 'CityPassUsageLink',
  },
]
