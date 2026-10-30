import type {Dayjs} from 'dayjs'
import type {
  BurningGuideApiResponse,
  ListItem,
} from '@/modules/burning-guide/types'
import {getTimeZones} from '@/modules/burning-guide/utils/getTimeZones'
import {mapAdviceToVariant} from '@/modules/burning-guide/utils/mapAdviceToVariant'

export const getForecast = (
  now: Dayjs,
  data?: BurningGuideApiResponse,
): ListItem[] =>
  data
    ? [
        {
          id: '0',
          isFixed: data.definitive_0,
          timeWindow: getTimeZones(now)[0].label,
          variant: mapAdviceToVariant(data.advice_0),
        },
        {
          id: '6',
          isFixed: data.definitive_6,
          timeWindow: getTimeZones(now)[1].label,
          variant: mapAdviceToVariant(data.advice_6),
        },
        {
          id: '12',
          isFixed: data.definitive_12,
          timeWindow: getTimeZones(now)[2].label,
          variant: mapAdviceToVariant(data.advice_12),
        },
        {
          id: '18',
          isFixed: data.definitive_18,
          timeWindow: getTimeZones(now)[3].label,
          variant: mapAdviceToVariant(data.advice_18),
        },
      ]
    : []
